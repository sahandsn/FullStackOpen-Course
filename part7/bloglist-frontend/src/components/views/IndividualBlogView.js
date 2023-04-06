import { useMutation, useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog, getBlogs } from '../../reducers/blogsReducer'
import { setNotification } from '../../reducers/notificationReducer'
import blogService from '../../services/blogs'
import { useParams } from 'react-router'

const IndividualBlogView = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams()
  const { user, blogs } = useSelector((state) => state)

  const result = useQuery(['blogs'], blogService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (blogs) => {
      dispatch(getBlogs(blogs))
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

  const handleLike = async (newBlog) => {
    likeBlogMutation.mutate(newBlog)
  }
  const handleDelete = (deletedBlog) => {
    deleteBlogMutation.mutate(deletedBlog)
  }
  const handleMessage = (messageObj) => {
    dispatch(setNotification(messageObj, 5))
  }

  const handleLikeIncrease = () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    handleLike(newBlog)
  }
  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
      navigate('/')
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  if (result.isLoading) {
    return (
      <div>
        <p>Loading blogs...</p>
      </div>
    )
  }
  if (result.isError) {
    return (
      <div>
        <p>Unfortunately, blog service is currently down. Come back later.</p>
      </div>
    )
  }
  const blog = blogs.find((blog) => blog.id === id)

  return (
    <>
      <div>
        <div style={blogStyle}>
          <h2>
            {blog.title} by {blog.author}
          </h2>
          <a href={blog.url} target='_blank' rel='noreferrer'>
            {blog.url}
          </a>
          <p>
            Likes: {blog.likes}
            <button onClick={handleLikeIncrease}>Like</button>
          </p>
          <p>added by {blog.user.username}</p>
          {blog.user.id === user.id && (
            <button onClick={handleDeleteBlog}>Remove</button>
          )}
        </div>
      </div>
    </>
  )
}

export default IndividualBlogView
