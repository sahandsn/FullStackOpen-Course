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
export interface Entry {}
export type NonSeneitivePatientType = Omit<PatientType, 'ssn'|'entries'>;
export type NewPatientType = Omit<PatientType, 'id' | 'entries'>;
