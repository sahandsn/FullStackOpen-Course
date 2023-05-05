import { DiaryEntry, Visibility, Weather } from '../src/types/diary';
import toNewDiaryEntry from '../src/utils/utils';
import { v1 as uuid } from 'uuid';

const data: DiaryEntry[] = [
  {
    id: uuid(),
    date: '2017-01-01',
    weather: Weather.Rainy,
    visibility: Visibility.Poor,
    comment: "Pretty scary flight, I'm glad I'm alive",
  },
  {
    id: uuid(),
    date: '2017-04-01',
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: "Everything went better than expected, I'm learning much",
  },
  {
    id: uuid(),
    date: '2017-04-15',
    weather: Weather.Windy,
    visibility: Visibility.Good,
    comment: "I'm getting pretty confident although I hit a flock of birds",
  },
  {
    id: uuid(),
    date: '2017-05-11',
    weather: Weather.Cloudy,
    visibility: Visibility.Good,
    comment: 'I almost failed the landing but I survived',
  },
];

const diaryEntries: DiaryEntry[] = data.map((obj) => {
  const object = toNewDiaryEntry(obj) as DiaryEntry;
  object.id = obj.id;
  return object;
});

export default diaryEntries;
