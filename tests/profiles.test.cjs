const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const runtime = () => {
  const docs = new Map(), loaded = new Map();
  let sequence = 0, failDeleteBatch = false;
  const ref = path => ({ path, id: path.split('/').at(-1) });
  const join = (base, parts) => [base?.path, ...parts].filter(Boolean).join('/');
  const snapshot = reference => ({ id: reference.id, ref: reference, exists: () => docs.has(reference.path), data: () => docs.get(reference.path) });
  const firestore = {
    doc: (base, ...parts) => parts.length ? ref(join(base, parts)) : ref(`${base.path}/id-${++sequence}`),
    collection: (base, ...parts) => ref(join(base, parts)),
    getDoc: async reference => snapshot(reference),
    getDocs: async reference => ({ docs: [...docs.keys()].filter(key => key.startsWith(`${reference.path}/`) && key.split('/').length === reference.path.split('/').length + 1).map(key => snapshot(ref(key))) }),
    setDoc: async (reference, data, options) => docs.set(reference.path, options?.merge ? { ...docs.get(reference.path), ...data } : data),
    updateDoc: async (reference, data) => { if (!docs.has(reference.path)) throw {code:'not-found'}; docs.set(reference.path, { ...docs.get(reference.path), ...data }); },
    deleteDoc: async reference => docs.delete(reference.path),
    query: reference => reference,
    where: () => undefined,
    runTransaction: async (_, operation) => operation({get: reference => firestore.getDoc(reference), update: (reference, data) => docs.set(reference.path, {...docs.get(reference.path), ...data})}),
    writeBatch: () => {
      const changes = [];
      return { set: (...args) => changes.push(['set', ...args]), delete: reference => changes.push(['delete', reference]), commit: async () => {
        if (failDeleteBatch && changes.some(item => item[0] === 'delete')) { failDeleteBatch = false; throw Error('offline'); }
        for (const [kind, reference, data, options] of changes) {
          if (kind === 'delete') docs.delete(reference.path);
          else await firestore.setDoc(reference, data, options);
        }
      }};
    },
  };
  const load = name => {
    if (loaded.has(name)) return loaded.get(name);
    const source = fs.readFileSync(path.join(__dirname, '../src/config', `${name}.ts`), 'utf8');
    const code = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
    const exports = {};
    vm.runInNewContext(code, {exports, require: name => name === 'firebase/firestore' ? firestore : name === './firebase' ? {db:{}} : load(name.replace('./','')), Date, Error, Promise});
    loaded.set(name, exports); return exports;
  };
  return {docs, load, failNextDelete: () => {failDeleteBatch=true;}};
};
const draft = {name:' Asia ',imageUrl:'/avatars/av1.jpg',ageGroup:'5-7'};

test('profiles: create/edit validate fields and retain stable identity and timestamp',async()=>{
 const h=runtime(), api=h.load('childProfiles');const id=await api.createChildProfile('parent',draft);
 const key=`users/parent/childProfiles/${id}`, created=h.docs.get(key).createdAt;
 assert.equal(h.docs.get(key).name,'Asia');await api.editChildProfile('parent',id,{...draft,name:'Joasia'});
 assert.equal(h.docs.get(key).createdAt,created);assert.equal(h.docs.get(key).name,'Joasia');
 for(const bad of [{...draft,name:' '},{...draft,name:'a'.repeat(41)},{...draft,imageUrl:'https://example.com/a.jpg'},{...draft,ageGroup:'adult'}]) await assert.rejects(api.createChildProfile('parent',bad));
 assert.equal(h.docs.size,1);
});
test('profiles: deletion is scoped, cleans both audio locales and can resume after interrupted cleanup',async()=>{
 const h=runtime(), api=h.load('childProfiles'), id=await api.createChildProfile('parent',draft);
 const base=`users/parent/childProfiles/${id}`;
 for(const suffix of ['favorites/fish','readingProgress/fish','readingProgress/fish/audioProgress/pl','readingProgress/fish/audioProgress/en'])h.docs.set(`${base}/${suffix}`,{});
 h.docs.set('users/parent/favorites/keep',{});h.docs.set('users/other/childProfiles/id-1',{});
 h.failNextDelete();await assert.rejects(api.deleteChildProfile('parent',id));assert.equal(h.docs.get(base).deleting,true);
 await assert.rejects(api.editChildProfile('parent',id,draft));
 await api.deleteChildProfile('parent',id);await api.deleteChildProfile('parent',id);
 assert.equal([...h.docs.keys()].some(key=>key===base||key.startsWith(base+'/')),false);
 assert.equal(h.docs.has('users/parent/favorites/keep'),true);assert.equal(h.docs.has('users/other/childProfiles/id-1'),true);
});
test('profiles: audio-only writes create discoverable child markers and never become slideshow progress',async()=>{
 const h=runtime(), audio=h.load('audioProgress'), profiles=h.load('childProfiles'), reading=h.load('firestore');
 const id=await profiles.createChildProfile('A',draft), data={fableId:'fish',locale:'pl',source:'pl.mp3',positionSeconds:20,durationSeconds:100,isCompleted:false,lastUpdated:1};
 await audio.saveAudioProgress('A',data,id);
 assert.equal((await audio.getAudioProgress('A','fish','pl','pl.mp3',id)).positionSeconds,20);
 assert.equal(await audio.getAudioProgress('A','fish','en','pl.mp3',id),null);
 assert.equal(await audio.getAudioProgress('A','fish','pl','pl.mp3','other-child'),null);
 assert.equal(await reading.getReadingProgress('A','fish',id),null);
 assert.equal((await reading.getContinueReading('A',id)).length,0);
 await reading.updateReadingProgress('A','fish',4,false,id);
 assert.equal((await reading.getReadingProgress('A','fish',id)).currentSlide,4);
 await audio.saveAudioProgress('A',{...data,positionSeconds:30},id);
 assert.equal((await reading.getReadingProgress('A','fish',id)).currentSlide,4);
 await profiles.deleteChildProfile('A',id);assert.equal(h.docs.size,0);
});
test('profiles: parent and children have separate favourites, reading and audio paths',async()=>{
 const h=runtime(), reading=h.load('firestore');
 for(const id of [null,'asia','stas']){
  await reading.addFavorite('A',id||'parent',id);await reading.updateReadingProgress('A','fish',id==='asia'?7:2,false,id);
 }
 assert.equal((await reading.getFavorites('A','asia'))[0].fableId,'asia');
 assert.equal((await reading.getFavorites('A','stas'))[0].fableId,'stas');
 assert.equal((await reading.getFavorites('A'))[0].fableId,'parent');
 await reading.removeFavorite('A','asia','asia');assert.equal((await reading.getFavorites('A','asia')).length,0);assert.equal((await reading.getFavorites('A','stas')).length,1);
});
test('profiles: invalid path segments never reach the persistence layer',()=>{
 const api=runtime().load('profileScope');
 for(const [uid,pid] of [['','a'],['A/other','a'],['A','../other'],['A','']])assert.throws(()=>api.profilePath(uid,pid));
 assert.equal(api.profilePath('A'),'users/A');assert.equal(api.profilePath('A','asia'),'users/A/childProfiles/asia');
});

test('Spark policy: updates preserve concurrent exclusions and hours, and never modify another child', async()=>{
 const h=runtime(), api=h.load('childProfiles'), policy=h.load('childPolicy');
 const asia=await api.createChildProfile('A',draft), stas=await api.createChildProfile('A',{...draft,name:'Staś'});
 await api.updateChildPolicy('A',asia,{storyId:'fish',available:false});
 const hours={...policy.defaultChildPolicy(),scheduleEnabled:true,timeZone:'Europe/London'};delete hours.excludedStories;
 await api.updateChildPolicy('A',asia,{schedule:hours});
 await api.updateChildPolicy('A',asia,{storyId:'goldilocks',available:false});
 let saved=h.docs.get(`users/A/childProfiles/${asia}`).policy;
 assert.deepEqual(Array.from(saved.excludedStories),['fish','goldilocks']);assert.equal(saved.timeZone,'Europe/London');assert.equal(saved.scheduleEnabled,true);
 await api.updateChildPolicy('A',asia,{storyId:'fish',available:true});saved=h.docs.get(`users/A/childProfiles/${asia}`).policy;
 assert.deepEqual(Array.from(saved.excludedStories),['goldilocks']);assert.equal(h.docs.get(`users/A/childProfiles/${stas}`).policy,undefined);
});
test('Spark schedule: start inclusive, end exclusive, weekends and disabled days use stored timezone',()=>{
 const api=runtime().load('childPolicy'), p={...api.defaultChildPolicy(),scheduleEnabled:true};
 const reason=iso=>api.childAccessReason(p,'fish',new Date(iso));
 assert.equal(reason('2026-10-28T07:59:59Z'),'hours');assert.equal(reason('2026-10-28T08:00:00Z'),null);
 assert.equal(reason('2026-10-28T17:59:59Z'),null);assert.equal(reason('2026-10-28T18:00:00Z'),'hours');
 assert.equal(reason('2026-10-31T18:30:00Z'),null);p.weekends.enabled=false;assert.equal(reason('2026-10-31T10:00:00Z'),'hours');
 p.excludedStories=['fish'];assert.equal(reason('2026-10-28T10:00:00Z'),'excluded');p.scheduleEnabled=false;assert.equal(reason('2026-10-28T23:00:00Z'),'excluded');
 assert.equal(api.childAccessReason(p,'other',new Date('2026-10-28T23:00:00Z')),null);
});
test('Spark policy: invalid windows, overnight ranges, timezones and malformed IDs cannot be saved',()=>{
 const api=runtime().load('childPolicy'), p=api.defaultChildPolicy();
 for(const bad of [{...p,timeZone:'Narnia/Fake'},{...p,weekdays:{enabled:true,start:'20:00',end:'09:00'}},{...p,weekends:{enabled:true,start:'09:00',end:'09:00'}},{...p,weekdays:{enabled:true,start:'99:00',end:'99:59'}},{...p,excludedStories:['../other']}])assert.throws(()=>api.normalizeChildPolicy(bad));
});
test('Spark schedule: daylight saving changes retain wall-clock access hours',()=>{
 const api=runtime().load('childPolicy'), p={...api.defaultChildPolicy(),scheduleEnabled:true};
 assert.equal(api.childAccessReason(p,'fish',new Date('2026-10-24T07:00:00Z')),null);
 assert.equal(api.childAccessReason(p,'fish',new Date('2026-10-25T07:00:00Z')),'hours');
 assert.equal(api.childAccessReason(p,'fish',new Date('2026-10-25T08:00:00Z')),null);
});
