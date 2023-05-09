import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import {
  NonSeneitivePatientType,
  NewPatientType,
  PatientType,
  Entry,
} from '../types/patients';

const findById = (id: string): PatientType => {
  const res = patientsData.find((p) => p.id === id);
  if (res === undefined) {
    throw new Error('patient not found');
  }
  return res;
};

const getPatient = (id: string) => {
  const patient = findById(id);
  if (typeof patient !== 'object') {
    throw new Error('Incorrect or missing patient');
  }
  return patient;
};

const getNonSensitivePatients = (): NonSeneitivePatientType[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (patient: NewPatientType): NonSeneitivePatientType => {
  const newPatient: PatientType = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patientsData.push(newPatient);
  const { id, name, dateOfBirth, gender, occupation }: NonSeneitivePatientType =
    newPatient;
  return { id, name, dateOfBirth, gender, occupation };
};

const addNewEntry = (newEntry: Entry, id: string): Entry => {
  const patient = findById(id);
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  addNewPatient,
  getPatient,
  addNewEntry,
};
