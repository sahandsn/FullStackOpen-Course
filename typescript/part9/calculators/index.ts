import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  let response;
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    response = { height, weight, bmi };
    res.json(response);
  } else {
    response = {
      error: 'malformatted parameters',
    };
    res.json(response);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
