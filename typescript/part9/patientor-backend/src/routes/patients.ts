import express from 'express';
import patientService from '../services/patients';
import { NewPatientType, NonSeneitivePatientType } from '../types/patients';
const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientService.getNonSensitivePatients();
  return res.json(result);
});

router.post('/', (req, res) => {
  const { ssn, name, dateOfBirth, gender, occupation }: NewPatientType = req.body;
  const newPatient: NonSeneitivePatientType = patientService.addNewPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn
  });
  return res.json(newPatient)
});

export default router;
