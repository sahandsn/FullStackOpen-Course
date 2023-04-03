import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useQuery } from '@tanstack/react-query'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification/Notification'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import {
  newBlog,
  getBlogs,
  likeBlog,
  deleteBlog,
} from './reducers/blogsReducer'
import { setUser, nullUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const { blogs, user } = useSelector((state) => state)

  const section = {
    border: 'solid',
    borderWidth: 1,
    margin: '5px',
    padding: '5px',
  }

  const blogFormRef = useRef()

  const addBlog = async (newBlogToBeSaved) => {
    try {
      const savedBlog = await blogService.createOne(newBlogToBeSaved)
      dispatch(newBlog(savedBlog))
      blogFormRef.current.toggleVisibility()
      handleMessage({
        message: `a new blog "${savedBlog.title}" by ${savedBlog.author} added`,
        mode: 'green',
      })
    } catch (exeption) {
      handleMessage({ message: 'invalid entry', mode: 'red' })
      console.warn(exeption)
    }
  }

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => blogs.sort((a, b) => b.likes - a.likes))
      .then((blogs) => dispatch(getBlogs(blogs)))
  }, [])
  // const result = useQuery(
  //   ['blogs'], blogService.getAll, {
  //     refetchOnWindowFocus: false,
  //     // retry: 1,
  //     onSuccess: async (blogs) => {
  //       await blogs.sort((a, b) => b.likes - a.likes)
  //       dispatch(getBlogs(blogs))
  //     }
  //   }
  // )
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      handleMessage({ message: `welcome back ${user.name}`, mode: 'green' })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(nullUser())
  }
  const handleMessage = (messageObj) => {
    dispatch(setNotification(messageObj, 5))
  }
  const handleLike = async (newBlog) => {
    try {
      const updatedBlog = await blogService.updateOne(newBlog)
      // console.log(updatedBlog)
      dispatch(likeBlog(updatedBlog))
      handleMessage({
        message: `blog ${updatedBlog.title} updated`,
        mode: 'green',
      })
    } catch (exeption) {
      console.log(exeption)
      handleMessage({ message: 'blog was not updated', mode: 'red' })
    }
  }
  const handleDelete = async (deletedBlog) => {
    try {
      await blogService.deleteOne(deletedBlog.id)
      handleMessage({ message: 'deleted blog', mode: 'green' })
      dispatch(deleteBlog(deletedBlog))
    } catch (exeption) {
      console.log(exeption)
      handleMessage({ message: 'blog was not deleted', mode: 'red' })
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Login to Application</h2>
        {/* <LoginForm setUser={setUser} handleMessage={handleMessage} /> */}
        <LoginForm />
      </div>
    )
  }

  // if (result.isLoading){
  //   return(
  //     <div>
  //       <p>loading data ...</p>
  //     </div>
  //   )
  // }

  // if (result.isSuccess) {
  //   return (
  //     <div>
  //       {/* <p>anecdote service not available due to problems in server</p> */}
  //       <p>it worked</p>
  //     </div>
  //   )
  // }
  // if (result.isError) {
  //   return (
  //     <div>
  //       {/* <p>anecdote service not available due to problems in server</p> */}
  //       <p>its error</p>
  //     </div>
  //   )
  // }

  return (
    <>
      <Notification />
      <div style={section}>
        <h2>Blogs</h2>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={section}>
        <h2>Create New</h2>
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      </div>

      <div>
        {user !== null && (
          <>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleDelete={handleDelete}
                user={user}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default App
