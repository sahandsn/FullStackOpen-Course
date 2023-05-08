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
export type NonSeneitivePatientType = Omit<PatientType, 'ssn' | 'entries'>;
export type NewPatientType = Omit<PatientType, 'id' | 'entries'>;

export interface BaseEntry {
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
  CriticalRisk,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  sickLeave?: SickLeave;
  employerName?: string;
}
export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export interface NewEntry extends BaseEntry {
  type: 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';
}

export interface Discharge {
  date: string;
  criteria: string;
}
export interface SickLeave {
  startDate: string;
  endDate: string;
}
