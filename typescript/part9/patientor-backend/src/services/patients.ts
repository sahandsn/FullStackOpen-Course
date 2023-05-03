import { PatientType, NonSeneitivePatientType } from '../types/patients';

const getNonSensitivePatients = (patients:PatientType[]):NonSeneitivePatientType[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}))
}

export default {
  getNonSensitivePatients
}