import express from 'express';
import diagnosisData from '../../data/diagnosis';
const router = express.Router();

router.get('/', (_req, res) => {
  return res.json(diagnosisData);
});

export default router;
