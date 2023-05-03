import { NewPatientType } from '../types/patients';
import { Gender } from '../types/patients';

const isString = (text:unknown): text is string => {
  return typeof text === "string" || text instanceof String
}

const parseName = (name:unknown):string => {
  if(!isString(name)){
    throw new Error("Incorrect or missing name.")
  }
  return name
}

const isGender = (gender:string):gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender)
}

const parseGender = (gender:unknown):Gender => {
  if(!isString(gender) || !isGender(gender)){
    throw new Error("Incorrect or missing gender.")
  }
  return gender
}

const parseOccupation = (occupation:unknown):string => {
  if(!isString(occupation)){
    throw new Error("Incorrect or missing occupation.")
  }
  return occupation
}

const parseSSN = (ssn:unknown):string => {
  if(!isString(ssn)){
    throw new Error("Incorrect or missing ssn.")
  }
  return ssn
}

const parseDateOfBirth = (dob:unknown):string => {
  if(!isString(dob)){
    throw new Error("Incorrect or missing date of birth.")
  }
  return dob
}


const toNewPatient = (obj:unknown):NewPatientType => {
  if ( !obj || typeof obj !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if("name" in obj && "ssn" in obj && "occupation" in obj && "gender" in obj && "dateOfBirth" in obj){
    const newPatient:NewPatientType = {
      name: parseName(obj.name),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
      ssn: parseSSN(obj.ssn),
      dateOfBirth: parseDateOfBirth(obj.dateOfBirth)
    }
    return newPatient
  }

  throw new Error('Incorrect data: a field missing');
}

export default toNewPatient