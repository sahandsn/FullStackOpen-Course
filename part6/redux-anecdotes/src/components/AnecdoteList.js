import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { notificationHide, notificationShow } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if(filter === 'ALL'){
            return [...anecdotes].sort((a1, a2) => a2.votes - a1.votes)
        } else {
            return [...anecdotes]
                    .sort((a1, a2) => a2.votes - a1.votes)
                    .filter(anecdote => anecdote.content.includes(filter))
        }
    })

    const voteHandler = (id, content) => {
        dispatch(voteForAnecdote(id)) 
        dispatch(notificationShow({content, action: 'voted'}))
        setTimeout(() => {
            dispatch(notificationHide())
        }, 5000)
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
                    <button onClick={() => voteHandler(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div>
    ) 
}

export default AnecdoteList
