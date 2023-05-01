import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  let response;
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    response = { height, weight, bmi };
    return res.json(response);
  } else {
    response = {
      error: 'malformatted parameters',
    };
    return res.json(response);
  }
});

app.post('/exercises', (req, res) => {
  let response;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (daily_exercises === undefined || target === undefined) {
    response = {
      error: 'parameters missing',
    };
    return res.json(response);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const data = daily_exercises.map((d: number) => Number(d)) as number[];
  if (data.every((d) => !isNaN(Number(d))) && !isNaN(Number(target))) {
    const result = calculateExercises(data, Number(target));
    return res.json(result);
  } else {
    response = {
      error: 'malformatted parameters',
    };
    return res.json(response);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
