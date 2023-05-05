import { useEffect, useState } from 'react';
import { DiaryEntry } from '../../types/diary';
import { getAll } from './services/diaryService';
import DiaryEntries from './components/DiaryEntries';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getAll().then((entries) => {
      setEntries(entries);
    });
  });
  return (
    <>
      <h1>My Diaries</h1>
      <DiaryEntries entries={entries} />
    </>
  );
};

export default App;
