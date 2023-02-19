import loginService from '../services/login'
import blogsService from '../services/blogs'
import { useState } from 'react'

const LoginForm = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const handleLogin = async (event) => {
      event.preventDefault()
      try{
        const user = await loginService.login({username, password})
        setUser(user)
        blogsService.setToken(user.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        setUsername('')
        setPassword('')
      } catch(exeption) {
        console.warn(exeption)
      }
    }
  
    return (
      <form onSubmit={handleLogin}>
        <div>
          username: <input type='text' name='username' value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password: <input type='password' name='password' value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type='submit'>Login</button>
      </form>
    )
  }

  export default LoginForm