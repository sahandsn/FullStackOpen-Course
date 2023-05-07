import { DiagnosisType as Diagnosis } from './diagnosis';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type PatientType = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export type NonSeneitivePatientType = Omit<PatientType, 'ssn'|'entries'>;
export type NewPatientType = Omit<PatientType, 'id' | 'entries'>;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  Healthy,
  LowRisk,
  HighRisk,
  CriticalRisk
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave?: {
    startDate: string,
    endDate: string,
  };
  employerName?: string
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string,
  };
}