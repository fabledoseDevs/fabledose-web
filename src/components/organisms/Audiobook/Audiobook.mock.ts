import { type AudiobookSource, AUDIOBOOK_SOURCE_TYPE } from './Audiobook.types';

export const audiobookMock: AudiobookSource = {
  title: 'Trzy małe świnki',
  coverUrl: '/mockImages/mockCover.jpg',
  audioUrl: '/mockAudio/file_example_MP3_2MG.mp3',
  sourceType: AUDIOBOOK_SOURCE_TYPE.LOCAL,
};
