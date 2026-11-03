const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const test=require('node:test');
const ts=require('typescript');
const load=relative=>{const exports={};const code=ts.transpileModule(fs.readFileSync(path.join(__dirname,'../',relative),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;vm.runInNewContext(code,{exports});return exports;};
const api=load('src/config/plans.ts');
test('plans: current selection supports animation and audio in Free, Family and Ultimate',()=>{
 const index=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/fable-database/index.json'),'utf8'));
 for(const story of index.tales){assert.equal(story.meta.availability,'selection');for(const plan of ['free','family','ultimate'])assert.equal(api.canAccessStory(plan,story.meta.availability),true);}
});
test('plans: future seasonal and subscription stories require paid plan; unknown plans fail closed',()=>{
 for(const availability of ['seasonal','subscription']){assert.equal(api.canAccessStory('free',availability),false);assert.equal(api.canAccessStory('family',availability),true);assert.equal(api.canAccessStory('ultimate',availability),true);assert.equal(api.canAccessStory('premium',availability),false);}
 assert.equal(api.canAccessStory('free',undefined),true);assert.equal(api.normalizeUserPlan(null),'free');
});
test('plans: PDF/EPUB and parental controls follow the same paid-plan boundary',()=>{
 for(const plan of ['free','family','ultimate',undefined]){const p=api.getPlanEntitlements(plan);assert.equal(p.ebooks,plan==='family'||plan==='ultimate');assert.equal(p.parentalControl,p.ebooks);}
});
test('plans: six children for Family, none for Free, unlimited for Ultimate',()=>{
 assert.equal(api.canCreateChildProfile('free',0),false);assert.equal(api.canCreateChildProfile('family',5),true);assert.equal(api.canCreateChildProfile('family',6),false);assert.equal(api.canCreateChildProfile('family',7),false);assert.equal(api.canCreateChildProfile('ultimate',1000),true);
});
test('plans: localized comparison includes licence on every simple card, matching all extended cards',()=>{
 for(const lang of ['pl','en']){const dictionary=Object.values(load('src/lang/dictionaries/'+lang+'.ts'))[0];const copy=dictionary.registerPage.planSelector;for(const plan of ['free','family','ultimate']){assert.equal(copy.plans[plan].optionalParagraphs.length,plan==='family'?0:1);assert.deepEqual(Array.from(copy.extended[plan].qualityList),plan==='free'?['SD (720p)']:plan==='family'?['SD (720p)','HD (1080p)']:['SD (720p)','HD (1080p)','QHD (2K)']);}assert.equal(copy.extended.free.contentList.length,2);assert.equal(copy.extended.family.contentList.length,3);assert.ok(dictionary.planAccess.allPlans);}
});

test('quality: shared controls enforce all plan ceilings and remove 4K',()=>{
 for(const plan of ['free','family','ultimate']){
  const options=api.getAnimationQualityOptions(plan);
  assert.deepEqual(Array.from(options,o=>o.value),['auto','sd','hd','2k']);
  assert.equal(options[0].isDisabled,false);assert.equal(options[1].isDisabled,false);
  assert.equal(options[2].isDisabled,plan==='free');assert.equal(options[3].isDisabled,plan!=='ultimate');
 }
});
test('quality: saved values normalize safely after downgrade and legacy 4K removal',()=>{
 assert.equal(api.getAnimationQuality('family','high'),'hd');
 assert.equal(api.getAnimationQuality('free','high'),'sd');
 assert.equal(api.getAnimationQuality('family','2k'),'hd');
 assert.equal(api.getAnimationQuality('free','2k'),'sd');
 assert.equal(api.getAnimationQuality('ultimate','2k'),'2k');
 for(const v of ['4k',undefined,'nonsense'])assert.equal(api.getAnimationQuality('ultimate',v),'auto');
});
test('quality: actual media profile respects plan, explicit quality, AUTO viewport and 2K fallback',()=>{
 for(const compact of [true,false]){
  for(const v of ['auto','sd','hd','2k','high','4k'])assert.equal(api.getAnimationMediaProfile('free',v,compact),'mobile');
  for(const plan of ['family','ultimate']){
   assert.equal(api.getAnimationMediaProfile(plan,'sd',compact),'mobile');
   assert.equal(api.getAnimationMediaProfile(plan,'hd',compact),'desktop');
   assert.equal(api.getAnimationMediaProfile(plan,'2k',compact),'desktop');
   assert.equal(api.getAnimationMediaProfile(plan,'auto',compact),compact?'mobile':'desktop');
  }
 }
});
