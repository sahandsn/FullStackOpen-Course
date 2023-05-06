import axios from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from '../../../types/diary';
const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllNonsensitive = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${baseUrl}`);
  return data;
};

export const addOne = async (obj: NewDiaryEntry) => {
  const { data } = await axios.post<NonSensitiveDiaryEntry>(`${baseUrl}`, obj);
  return data;
};
