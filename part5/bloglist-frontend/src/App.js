import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({message:null, mode:'green'})

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs)) 
  }, [])
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      handleMessage({message:`welcome back ${user.name}`, mode:'green'})
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const handleMessage = (newMessage) => {
    setMessage(newMessage)
    setTimeout(()=>setMessage({message:null}), 4000)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <h2>Login to Application</h2>
        <LoginForm setUser={setUser} handleMessage={handleMessage}/>
      </div>
    )
  }

  return (
    <>
      <Notification message={message} />
      <div>
        <h2>blogs</h2>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <h2>create new</h2>
        <BlogForm setBlogs={setBlogs} blogs={blogs} handleMessage={handleMessage}/>
        {user !== null && <>{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}</>}
      </div>
    </>
  )
}

export default App