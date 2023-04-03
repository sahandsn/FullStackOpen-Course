import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery, useMutation } from '@tanstack/react-query'
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

  const newBlogMutation = useMutation(blogService.createOne, {
    onSuccess: (newBlogToBeSaved) => {
      dispatch(newBlog(newBlogToBeSaved))
      blogFormRef.current.toggleVisibility()
      handleMessage({
        message: `a new blog "${newBlogToBeSaved.title}" by ${newBlogToBeSaved.author} added`,
        mode: 'green',
      })
    },
    onError: () => {
      handleMessage({ message: 'new blog was not created', mode: 'red' })
    },
  })
  const likeBlogMutation = useMutation(blogService.updateOne, {
    onSuccess: (updatedBlog) => {
      dispatch(likeBlog(updatedBlog))
      handleMessage({
        message: `blog ${updatedBlog.title} liked`,
        mode: 'green',
      })
    },
    onError: () => {
      handleMessage({
        message: 'blog was not liked',
        mode: 'red',
      })
    },
  })
  const deleteBlogMutation = useMutation(blogService.deleteOne, {
    onSuccess: (deletedBlog) => {
      handleMessage({
        message: `blog ${deletedBlog.title} deleted`,
        mode: 'green',
      })
      dispatch(deleteBlog(deletedBlog))
    },
    onError: () => {
      handleMessage({
        message: 'failed to delete blog',
        mode: 'red',
      })
    },
  })

  const result = useQuery(['blogs'], blogService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: async (blogs) => {
      await blogs.sort((a, b) => b.likes - a.likes)
      dispatch(getBlogs(blogs))
    },
  })

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      handleMessage({ message: `welcome back ${user.name}`, mode: 'green' })
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreate = (newBlogToBeSaved) => {
    newBlogMutation.mutate(newBlogToBeSaved)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(nullUser())
  }
  const handleMessage = (messageObj) => {
    dispatch(setNotification(messageObj, 5))
  }
  const handleLike = async (newBlog) => {
    likeBlogMutation.mutate(newBlog)
  }
  const handleDelete = (deletedBlog) => {
    deleteBlogMutation.mutate(deletedBlog)
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Login to Application</h2>
        <LoginForm />
      </div>
    )
  }

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
          <BlogForm addBlog={handleCreate} />
        </Togglable>
      </div>

      <div>
        {user !== null && result.isLoading && (
          <>
            <p>Loading blogs...</p>
          </>
        )}
      </div>

      <div>
        {user !== null && result.isError && (
          <>
            <p>
              Unfortunately, blog service is currently down. Come back later.
            </p>
          </>
        )}
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
