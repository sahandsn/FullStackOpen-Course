import { useState } from 'react'

// button component
const Button = ({setState, state, text}) => {
  return (
    <>
      <button onClick={() => setState(state + 1)}>
        {text}
      </button>
    </>
  ) 
}


// display component
const StatisticLine = ({text, value, char}) => {
  return  (
    <>
      <p>{text} {value} {char}</p>
    </>
  )
}

// statistics component
const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;
  let score = good - bad
  let average = score/all || 0
  let positive = (good/all)*100 || 0

  if(all===0){
    return(
      <>
        <h1>statistics</h1>
        <div>
          <p>No feedback given</p>
        </div>
      </>
    ) 
  }

  return (
    <>
      <h1>statistics</h1>
      <div>
        <StatisticLine value={good} text={'good'} />
        <StatisticLine value={neutral} text={'neutral'} />
        <StatisticLine value={bad} text={'bad'} />
        <StatisticLine value={all} text={'all'} />
        <StatisticLine value={average} text={'average'} />
        <StatisticLine value={positive} text={'positive'} char={'%'}/>
      </div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button setState={setGood} state={good} text={'good'} />
        <Button setState={setNeutral} state={neutral} text={'neutral'} />
        <Button setState={setBad} state={bad} text={'bad'} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App