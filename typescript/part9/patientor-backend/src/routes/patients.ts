import express from 'express';
import patientService from '../services/patients';
import { NonSeneitivePatientType } from '../types/patients';
import toNewPatient from '../utils/utils';
const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientService.getNonSensitivePatients();
  return res.json(result);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient: NonSeneitivePatientType = patientService.addNewPatient({
      ...newPatient,
    });
    return res.json(addedPatient);
  } catch (e: unknown) {
    let errMsg = 'Sorry! Something went wrong. ';
    if (e instanceof Error) {
      errMsg += e.message;
    }
    return res.status(400).send(errMsg);
  }
});

export default router;
