import express from 'express'
import patientsData from '../../data/patients'
import patientService from '../services/patients'
const router = express.Router()

router.get('/', (_req, res) => {
  const result = patientService.getNonSensitivePatients(patientsData)
  return res.json(result)
})

export default router