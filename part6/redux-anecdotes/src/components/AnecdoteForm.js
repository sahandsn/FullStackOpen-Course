import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationHide, notificationShow } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispatch(createAnecdote(content))
        dispatch(notificationShow({content, action: 'created'}))
        setTimeout(() => {
            dispatch(notificationHide())
        }, 5000)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={submitHandler}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
