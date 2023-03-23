import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => [...state].sort((a1, a2) => a2.votes - a1.votes))

    const voteHandler = (id) => {
        dispatch(vote(id)) 
    }

    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteHandler(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
    
}

export default AnecdoteList
