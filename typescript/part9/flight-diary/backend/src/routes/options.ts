import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/:option', (req, res) => {
  const { option } = req.params;
  return res.send(diaryService.getOptions(option));
});

export default router;
