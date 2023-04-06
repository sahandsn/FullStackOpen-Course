import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getUsers } from '../reducers/usersReducer'
import { getAll } from '../services/users'

const IndividualUserView = ({ section }) => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const result = useQuery(['users'], getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (users) => {
      [...users].sort((a, b) => b.blogs.length - a.blogs.length)
      dispatch(getUsers(users))
    },
  })

  if (result.isLoading) {
    return (
      <div style={section}>
        <p>Loading data...</p>
      </div>
    )
  }
  if (result.isError) {
    return (
      <div style={section}>
        <p>Unfortunately, blog service is currently down. Come back later.</p>
      </div>
    )
  }
  const user = result.data.find((user) => user.id === id)
  if (user.blogs.length === 0) {
    return (
      <div style={section}>
        <h2>{user.name}</h2>
        <p>no blogs added.</p>
      </div>
    )
  }

  return (
    <div style={section}>
      <h2>{user.name}</h2>
      <p>added blogs:</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default IndividualUserView
