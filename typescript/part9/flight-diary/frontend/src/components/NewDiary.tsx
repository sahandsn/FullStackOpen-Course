import {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  NotificationType,
} from '../../../types/diary';
import { useState, useEffect, Fragment } from 'react';
import { addOne } from '../services/diaryService';
import { getOptions } from '../services/optionService';
import { AxiosError } from 'axios';

const NewDiary = ({
  setEntries,
  handleMsg,
}: {
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  handleMsg: (newMessage: NotificationType) => void;
}) => {
  const [weatherOptions, setWeatherOptions] = useState<string[]>([]);
  const [visibilityOptions, setVisibilityOptions] = useState<string[]>([]);

  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    (async () => {
      const [weather, visibility] = await Promise.all([getOptions('weather'), getOptions('visibility')])
      setVisibilityOptions(visibility)
      setWeatherOptions(weather)
    })()
  }, [])

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newEntry = {
      weather,
      visibility,
      date,
      comment,
    };

    try {
      const addedEntry = await addOne(newEntry as NewDiaryEntry);
      setEntries((prev) => prev.concat(addedEntry));
      handleMsg({ text: 'new entry added', mode: 'green' });
    } catch (e: unknown) {
      let errMsg = 'Something went wrong: ';
      if (e instanceof AxiosError) {
        errMsg = e.response?.data;
      }
      handleMsg({ text: errMsg, mode: 'red' });
    }

    setWeather('');
    setVisibility('');
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
            type='date'
            placeholder='YYYY-MM-DD'
            id='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <div>
          <fieldset>
            <legend>Visibility</legend>
            <div>
              {visibilityOptions.map((v) => (
                <Fragment key={v.toString()}>
                  <input
                    checked={visibility === v.toString()}
                    type='radio'
                    value={v.toString()}
                    id={v.toString()}
                    name='visibility'
                    onChange={(e) =>
                      setVisibility(e.target.value)
                    }
                  />
                  <label htmlFor={v.toString()}>{v.toString()}</label>
                </Fragment>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <fieldset>
            <legend>Weather</legend>
            <div>
              {weatherOptions.map((v) => (
                <Fragment key={v.toString()}>
                  <input
                    checked={weather === v.toString()}
                    type='radio'
                    value={v.toString()}
                    id={v.toString()}
                    name='weather'
                    onChange={(e) => setWeather(e.target.value)}
                  />
                  <label htmlFor={v.toString()}>{v.toString()}</label>
                </Fragment>
              ))}
            </div>
          </fieldset>
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
          ></textarea>
        </div>

        <button type='submit'>add</button>
      </form>
    </>
  );
};

export default NewDiary;
