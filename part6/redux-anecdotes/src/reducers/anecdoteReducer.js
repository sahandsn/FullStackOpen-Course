import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    },
    newAnecdote: (state, action) => {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }

})

export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdoteAdded = await createNew(content)
    dispatch(newAnecdote(newAnecdoteAdded))
  }
}

export default anecdoteSlice.reducer
