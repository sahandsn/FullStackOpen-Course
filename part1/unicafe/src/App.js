import { useState } from 'react'

// button component
const Button = (props) => {
  return (
    <>
      <button onClick={() => props.setState(props.state + 1)}>
        {props.text}
      </button>
    </>
  ) 
}


// display component
const Display = (props) => {
  return  (
    <>
      <p>{props.text} {props.state} {props.char}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad;
  let score = good - bad
  let average = score/all || 0
  let positive = (good/all)*100 || 0
  

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button setState={setGood} state={good} text={'good'} />
        <Button setState={setNeutral} state={neutral} text={'neutral'} />
        <Button setState={setBad} state={bad} text={'bad'} />
      </div>
      <h1>statistics</h1>
      <div>
        <Display state={good} text={'good'} />
        <Display state={neutral} text={'neutral'} />
        <Display state={bad} text={'bad'} />
        <Display state={all} text={'all'} />
        <Display state={average} text={'average'} />
        <Display state={positive} text={'positive'} char={'%'}/>
      </div>
      
    </>
  )
}

export default App