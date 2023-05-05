import { NonSensitiveDiaryEntry } from '../types/diary';
const DiaryEntries = ({ entries }: { entries: NonSensitiveDiaryEntry[] }) => {
  return (
    <>
      <h2>Diary Entries</h2>
      <ul>
        {entries.map((d) => (
          <li key={d.id}>
            <h2>{d.date}</h2>
            <p>vissibility: {d.visibility}</p>
            <p>weather: {d.weather}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DiaryEntries;
