export type PatientType = {
  id: String,
  name: String,
  dateOfBirth: String,
  ssn: String,
  gender: String,
  occupation: String
}

export type NonSeneitivePatientType = Omit<PatientType, "ssn">
export type NewPatientType = Omit<PatientType, "id">