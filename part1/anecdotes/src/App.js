import { useState } from 'react'
import './styles.css'

// button compnent
const Button = ({text, onClick}) => {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
    
  )
}


// random number generator
const PRNG = (min, max) => {
  // the returned value is an integer between min and max numbers, inclusive
  min = Math.ceil(min)
  max = Math.floor(max)
  
  const random = Math.floor(Math.random()*(max-min+1)+min)
  
  return random
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  // states
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // event handlers refrences
  const handleVote = ()=>{
    const newArr = [...votes]
    newArr[selected]+=1
    setVotes(newArr)
  }

  const handleNext = () => {
    setSelected(PRNG(0, anecdotes.length-1))
  }
  
  return (
    <>
      <blockquote>{anecdotes[selected]}</blockquote>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleNext} />
    </>
    
  )
}

export default App