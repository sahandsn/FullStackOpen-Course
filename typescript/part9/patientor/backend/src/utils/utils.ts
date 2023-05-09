import {
  NewPatientType,
  Gender,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  Discharge,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
  BaseEntry,
} from '../types/patients';
import { DiagnosisType } from '../types/diagnosis';
import { v1 as uuid } from 'uuid';

const isString = (text: unknown): text is string => {
  return (
    (typeof text === 'string' || text instanceof String) && text.length !== 0
  );
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender.');
  }
  return gender;
};

const isDate = (d: string): boolean => {
  const date = new Date(d);

  if (
    date.toString() === 'Invalid Date' ||
    date.getFullYear() < 1899 ||
    d.length !== 10
  ) {
    return false;
  }
  return true;
};

const parseDate = (dob: unknown): string => {
  if (!isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing date.');
  }
  return dob;
};

export const toNewPatient = (obj: unknown): NewPatientType => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in obj &&
    'ssn' in obj &&
    'occupation' in obj &&
    'gender' in obj &&
    'dateOfBirth' in obj
  ) {
    const newPatient: NewPatientType = {
      name: parseString(obj.name, 'name'),
      gender: parseGender(obj.gender),
      occupation: parseString(obj.occupation, 'occupation'),
      ssn: parseString(obj.ssn, 'SSN'),
      dateOfBirth: parseDate(obj.dateOfBirth),
    };
    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosisType['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<DiagnosisType['code']>;
  }

  return object.diagnosisCodes as Array<DiagnosisType['code']>;
};

const parseString = (string: unknown, stringName: string): string => {
  if (!isString(string)) {
    throw new Error(`Incorrect or missing ${stringName}.`);
  }
  return string;
};

export const toNewEntry = (obj: unknown): Entry => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing entry');
  }

  if (
    'description' in obj &&
    'date' in obj &&
    'specialist' in obj &&
    'type' in obj
  ) {
    const newEntry: BaseEntry = {
      id: uuid(),
      description: parseString(obj.description, 'entry description'),
      date: parseDate(obj.date),
      specialist: parseString(obj.specialist, 'specialist'),
    };
    if ('diagnosisCodes' in obj) {
      newEntry.diagnosisCodes = parseDiagnosisCodes(obj);
    }
    switch (obj.type) {
      case 'HealthCheck': {
        if ('healthCheckRating' in obj) {
          const HealthCheckNewEntry: HealthCheckEntry = {
            ...newEntry,
            healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
            type: obj.type,
          };
          return HealthCheckNewEntry;
        }
        throw new Error('incorrect or missing entry type: HealthCheckRating');
      }
      case 'OccupationalHealthcare': {
        const OccupationalHealthcareNewEntry: OccupationalHealthcareEntry = {
          ...newEntry,
          type: obj.type,
        };
        if ('sickLeave' in obj && isSickLeave(obj.sickLeave)) {
          OccupationalHealthcareNewEntry.sickLeave = obj.sickLeave;
        }
        if ('employerName' in obj && isString(obj.employerName)) {
          OccupationalHealthcareNewEntry.employerName = parseString(
            obj.employerName,
            'employer name'
          );
        }
        return OccupationalHealthcareNewEntry;
      }
      case 'Hospital': {
        if ('discharge' in obj) {
          const HospitalNewEntry: HospitalEntry = {
            ...newEntry,
            discharge: parseDischarge(obj.discharge),
            type: obj.type,
          };
          return HospitalNewEntry;
        }
        throw new Error('incorrect or missing entry type: Discharge');
      }
      default: {
        throw new Error('incorrect or missing entry type: unrecognized type');
      }
    }
  }

  throw new Error('Incorrect data: a field missing in patient entry');
};

const parseHealthCheckRating = (x: unknown): HealthCheckRating => {
  if (!Number.isInteger(x)) {
    throw new Error('incorrect or missing health check rating');
  }
  switch (x) {
    case 0:
      return HealthCheckRating.Healthy;
    case 1:
      return HealthCheckRating.LowRisk;
    case 2:
      return HealthCheckRating.HighRisk;
    case 3:
      return HealthCheckRating.CriticalRisk;
    default:
      throw new Error('incorrect or missing health check rating');
  }
};

const parseDischarge = (x: unknown): Discharge => {
  if (!x || typeof x !== 'object') {
    throw new Error('incorrect or missing discharge');
  }
  if (!('date' in x) || !('criteria' in x)) {
    throw new Error('incorrect or missing discharge');
  }

  return {
    date: parseDate(x.date),
    criteria: parseString(x.criteria, 'criteria'),
  };
};

const isSickLeave = (x: unknown): x is SickLeave => {
  if (!x || typeof x !== 'object') {
    return false;
  }
  if (!('startDate' in x) || !('endDate' in x)) {
    throw new Error('incorrect or missing sick leave');
  }

  if (!isString(x.endDate) || !isString(x.startDate)) {
    return false;
  }
  return true;
};
