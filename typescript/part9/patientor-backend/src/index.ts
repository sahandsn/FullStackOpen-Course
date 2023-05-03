import express from 'express';
import diagnosisRouter from './routes/diagnosis';
const app = express();
app.use(express.json());

const PORT = 3001;

app.use('/api/diagnosis', diagnosisRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
