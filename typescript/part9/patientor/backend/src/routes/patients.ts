import express from 'express';
import patientService from '../services/patients';
import { Entry, NonSeneitivePatientType } from '../types/patients';
import { toNewEntry, toNewPatient } from '../utils/utils';
const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientService.getNonSensitivePatients();
  return res.json(result);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = patientService.getPatient(id);
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

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry: Entry = patientService.addNewEntry(newEntry, id);
    return res.json(addedEntry);
  } catch (e: unknown) {
    let errMsg = 'Sorry! Something went wrong. ';
    if (e instanceof Error) {
      errMsg += e.message;
    }
    console.log(errMsg);
    
    return res.status(400).send(errMsg);
  }
});

export default router;
