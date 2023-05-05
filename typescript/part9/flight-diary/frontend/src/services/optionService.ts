import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/options';

export const getOptions = async (option: string) => {
  const { data } = await axios.get<string[]>(`${baseUrl}/${option}`);
  return data;
};
