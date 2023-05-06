import { useEffect, useState } from 'react';
import { NonSensitiveDiaryEntry, NotificationType } from '../../types/diary';
import { getAllNonsensitive } from './services/diaryService';
import DiaryEntries from './components/DiaryEntries';
import NewDiary from './components/NewDiary';
import Notification from './components/Notification';

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [msg, setMessage] = useState<NotificationType>({ text: null, mode: 'green' });

  const handleMsg = (newMessage:NotificationType) => {
    setMessage(newMessage)
    setTimeout(() => setMessage({ text: null, mode: 'green' }), 4000)
  }

  useEffect(() => {
    getAllNonsensitive().then((entries) => {
      setEntries(entries);
    });
  }, []);
  return (
    <>
      <h1>My Diaries</h1>
      <Notification text={msg.text} mode={msg.mode}/>
      <NewDiary setEntries={setEntries} handleMsg={handleMsg}/>
      <DiaryEntries entries={entries} />
    </>
  );
};

export default App;
