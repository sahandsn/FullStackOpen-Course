import loginService from '../services/login'
import blogsService from '../services/blogs'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      blogsService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification({ message: `welcome ${user.name}`, mode: 'green' }, 5))
    } catch (exeption) {
      dispatch(setNotification({ message: 'invalid username/password', mode: 'red' }, 5))
      console.warn(exeption)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:{' '}
        <input
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:{' '}
        <input
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

// LoginForm.propTypes = {
//   setUser: PropTypes.func.isRequired,
//   setNotification: PropTypes.func.isRequired,
// }

export default LoginForm
