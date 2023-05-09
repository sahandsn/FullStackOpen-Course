import axios from 'axios';
import { Entry, Patient, PatientFormValues, NewEntry } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const addEntry = async (id: string, newEntry: NewEntry) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, newEntry);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getOne,
  addEntry
};
