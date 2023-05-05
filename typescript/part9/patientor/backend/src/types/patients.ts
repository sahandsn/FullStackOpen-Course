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
};

export type NonSeneitivePatientType = Omit<PatientType, 'ssn'>;
export type NewPatientType = Omit<PatientType, 'id'>;
