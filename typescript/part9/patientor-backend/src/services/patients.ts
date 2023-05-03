import { v1 as uuid } from "uuid"
import patientsData from '../../data/patients';
import { NonSeneitivePatientType, NewPatientType, PatientType } from '../types/patients';

const getNonSensitivePatients = ():NonSeneitivePatientType[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}))
}

const addNewPatient = (patient:NewPatientType):NonSeneitivePatientType => {
  const newPatient : PatientType = {
    id: uuid(),
    ...patient,
  }
  patientsData.push(newPatient)
  const {id, name, dateOfBirth, gender, occupation}:NonSeneitivePatientType = newPatient
  return {id, name, dateOfBirth, gender, occupation}
}

export default {
  getNonSensitivePatients,
  addNewPatient
}