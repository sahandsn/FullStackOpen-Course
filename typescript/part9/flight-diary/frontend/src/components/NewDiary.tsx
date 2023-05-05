import { NonSensitiveDiaryEntry, NotificationType } from '../types/diary';
import { useState, useEffect } from 'react';
import { addOne } from '../services/diaryService';
import { Weather, Visibility } from '../types/diary';
import { AxiosError } from 'axios';

const NewDiary = ({
  setEntries,
  handleMsg
}: {
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  handleMsg: (newMessage: NotificationType) => void
}) => {

  const [weather, setWeather] = useState<Weather>(Weather.Default);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Default);
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry = {
      weather,
      visibility,
      date,
      comment,
    };
    try{
      const addedEntry = await addOne(newEntry);
      setEntries(prev => prev.concat(addedEntry))
      handleMsg({text: 'new entry added', mode: 'green'})
    } catch(e:unknown) {
      let errMsg = 'Something went wrong: '
      if(e instanceof AxiosError){
        errMsg = e.response?.data
      }
      // console.log(errMsg);
      handleMsg({text: errMsg, mode: 'red'})
    }
    

    setWeather(Weather.Default);
    setVisibility(Visibility.Default);
    setComment('');
    setDate('');
  };

  return (
    <>
      <h2>Add New Entry</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='date'>Date</label>
          <input
            required
            type='date'
            placeholder='YYYY-MM-DD'
            id='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <div>
          <label htmlFor='visibility'>Visibility</label>
          <select
            id='visibility'
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          >
            {Object.values(Visibility).map((v) => (
              <option value={v.toString()} key={v.toString()}>
                {v.toString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='weather'>Weather</label>
          <select
            id='weather'
            value={weather}
            onChange={(e) => setWeather(e.target.value as Weather)}
          >
            {Object.values(Weather).map((v) => (
              <option value={v.toString()} key={v.toString()}>
                {v.toString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='comment'>Comment</label>
          <textarea
            id='comment'
            rows={5}
            cols={33}
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder='What happened?'
            required
          ></textarea>
        </div>

        <button type='submit'>add</button>
      </form>
    </>
  );
};

export default NewDiary;
