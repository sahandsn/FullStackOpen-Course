import express from 'express';
import cors from 'cors';
const app = express();
import diaryRouter from './routes/diaries';
import optionsRouter from './routes/options';
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);
app.use('/api/options', optionsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
