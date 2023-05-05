import diaryData from '../../data/entries';
import { v1 as uuid } from 'uuid';
import {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  NewDiaryEntry,
  Weather,
  Visibility,
} from '../types/diary';

const getEntries = (): DiaryEntry[] => {
  return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData.map((obj) => getNonSensitiveEntry(obj));
};

const getNonSensitiveEntry = (obj: DiaryEntry): NonSensitiveDiaryEntry => {
  return {
    id: obj.id,
    date: obj.date,
    weather: obj.weather,
    visibility: obj.visibility,
  };
};

const findById = (id: string): DiaryEntry | undefined => {
  const entry = diaryData.find((d) => d.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry): NonSensitiveDiaryEntry => {
  const newDiaryEntry = {
    id: uuid(),
    ...entry,
  };

  diaryData.push(newDiaryEntry);
  return getNonSensitiveEntry(newDiaryEntry);
};

const getOptions = (option:string): string[] => {
  // return Object.values(option).map((v) => v.toString());
  console.log(Weather);
  
  switch(option){
    case 'weather':{
      return Object.values(Weather).map((v) => v.toString());
    }
    case 'visibility':{
      return Object.values(Visibility).map((v) => v.toString());
    }
    default:{
      return ['sth went wrong.']
    }
  }
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
  getOptions,
};
