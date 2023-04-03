import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { getAll } from '../services/users'

const UsersView = ({ section }) => {
  const dispatch = useDispatch()
  const result = useQuery(['users'], getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (users) => {
      [...users].sort((a, b) => b.blogs.length - a.blogs.length)
      dispatch(getUsers(users))
    },
  })

  return (
    <div style={section}>
      <h2>users</h2>
      <div>{result.isLoading && <p>Loading data...</p>}</div>
      <div>
        {result.isError && (
          <p>Unfortunately, blog service is currently down. Come back later.</p>
        )}
      </div>
      <div>
        {result.isSuccess && (
          <>
            <table>
              <thead>
                <tr>
                  <td></td>
                  <th>blogs created</th>
                </tr>
              </thead>
              <tbody>
                {result.data.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                      <td>{user.blogs.length}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

export default UsersView
