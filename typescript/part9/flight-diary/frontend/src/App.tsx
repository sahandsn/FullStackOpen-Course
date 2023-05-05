import { useEffect, useState } from 'react';
import { NonSensitiveDiaryEntry } from './types/diary';
import { getAllNonsensitive } from './services/diaryService';
import DiaryEntries from './components/DiaryEntries';
import NewDiary from './components/NewDiary';

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  useEffect(() => {
    getAllNonsensitive().then((entries) => {
      setEntries(entries);
    });
  }, []);
  return (
    <>
      <h1>My Diaries</h1>
      <NewDiary setEntries={setEntries} />
      <DiaryEntries entries={entries} />
    </>
  );
};

export default App;
