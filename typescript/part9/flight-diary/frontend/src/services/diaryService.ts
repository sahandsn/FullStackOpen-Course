import axios from 'axios';
import { DiaryEntry } from '../../../types/diary';
const baseUrl = 'http://localhost:3001/api';

export const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${baseUrl}/diaries`);
  return data;
};
