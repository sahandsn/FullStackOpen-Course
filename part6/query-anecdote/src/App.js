import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './AnecdotesContex'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const result = useQuery(
    ['anecdotes'], getAnecdotes, {
      retry: 1,
      refetchOnWindowFocus: false
      
    }
  )

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      // download the entire db to update votes
      // queryClient.invalidateQueries(['anecdotes'])

      // manually updates votes
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedArr = [...anecdotes]
      const index = anecdotes.findIndex(anecdote => anecdote.id === updatedAnecdote.id)
      if (index !== -1) {
        updatedArr[index] = {
          ...updatedArr[index],
          votes: updatedArr[index].votes + 1
        }
      }
      queryClient.setQueryData(['anecdotes'], updatedArr)
      dispatch({type: 'VOTE', payload: updatedAnecdote})
      setTimeout(() => {
        dispatch({type: null})
      }, 5000)
    },
  })

  const handleVote = (anecdote) => {
    // console.log(`vote ${anecdote.id}`)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    
  }

  if (result.isLoading){
    return(
      <div>
        <p>loading data ...</p>
      </div>
    )
  }

  if (result.isError) {
    return (
      <div>
        <p>anecdote service not available due to problems in server</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {result.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
