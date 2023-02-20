import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({message:null, mode:'green'})

  const section = {
    border: 'solid',
    borderWidth: 1,
    margin: '5px',
    padding: '5px',
  }

  const blogFormRef = useRef()

  const addBlog = async (newBlog) => {   
    try{
      const savedBlog = await blogService.createOne(newBlog)
      setBlogs(blogs.concat(savedBlog))
      blogFormRef.current.toggleVisibility()
      handleMessage({message:`a new blog "${savedBlog.title}" by ${savedBlog.author} added`, mode:'green'})
      
  } catch(exeption) {
      handleMessage({message:'invalid entry', mode:'red'})
      console.warn(exeption)
  }
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => blogs.sort((a, b) => b.likes - a.likes))
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
  const handleLike = async (newBlog) => {
    try{
      const updatedBlog = await blogService.updateOne(newBlog)
      setBlogs(blogs
        .map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
        .sort((a, b) => b.likes - a.likes)
      )
      handleMessage({message: 'blog updated', mode: 'green'})
    } catch(exeption) {
      console.log(exeption);
      handleMessage({message: 'blog was not updated', mode: 'red'})
    }
    
  }
  const handleDelete = async (deletedBlog) => {
    try{
      await blogService.deleteOne(deletedBlog.id)
      handleMessage({message: 'deleted blog', mode: 'green'})
      setBlogs(blogs
        .filter(blog => blog.id !== deletedBlog.id)
        .sort((a, b) => b.likes - a.likes)
      )
    } catch(exeption) {
      console.log(exeption);
      handleMessage({message: 'blog was not deleted', mode: 'red'})
    }
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
      <div style={section}>
        <h2>Blogs</h2>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={section}>
        <h2>Create New</h2>
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <BlogForm setBlogs={setBlogs} blogs={blogs} handleMessage={handleMessage} addBlog={addBlog}/>
        </Togglable>
      </div>
      
      <div>
        {user !== null && <>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>)}
        </>}
      </div> 
        
      
    </>
  )
}

export default App