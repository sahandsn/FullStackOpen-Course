import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {user === null && <LoginForm setUser={setUser} />}
      {user !== null && <>{user.name} is logged in</>}
      {user !== null && <>{blogs.map(blog =><Blog key={blog.id} blog={blog} />)}</>}
    </div>
  )
}

export default App