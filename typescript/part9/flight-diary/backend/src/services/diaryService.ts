import diaryData from '../../data/entries';
import { v1 as uuid } from 'uuid';
import {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  NewDiaryEntry,
} from '../../../types/diary';

const getEntries = (): DiaryEntry[] => {
  return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData.map(({ id, date, weather, visibility, comment }) => ({
    id,
    date,
    weather,
    visibility,
    comment
  }));
};

const findById = (id: string): DiaryEntry | undefined => {
  const entry = diaryData.find((d) => d.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: uuid(),
    ...entry,
  };

  diaryData.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
