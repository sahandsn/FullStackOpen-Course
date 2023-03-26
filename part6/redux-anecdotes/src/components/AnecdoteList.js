import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    // console.log(useSelector(state=>state).getState())
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if(filter === 'ALL'){
            return [...anecdotes].sort((a1, a2) => a2.votes - a1.votes)
        } else {
            return [...anecdotes]
                    .sort((a1, a2) => a2.votes - a1.votes)
                    .filter(anecdote => anecdote.content.includes(filter))
        }
        // return [...anecdotes, filter.anecdotes].sort((a1, a2) => a2.votes - a1.votes)
    })
    // console.log(anecdotes)
    // const voteHandler = (id) => {
    //     dispatch(vote(id)) 
    //     // voteHandler(anecdote.id)
    // }

    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(vote({id:anecdote.id}))}>vote</button>
                </div>
                </div>
            )}
        </div>
    ) 
}

export default AnecdoteList
