export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type PatientType = {
  id: String,
  name: String,
  dateOfBirth: String,
  ssn: String,
  gender: Gender,
  occupation: String
}

export type NonSeneitivePatientType = Omit<PatientType, "ssn">
export type NewPatientType = Omit<PatientType, "id">