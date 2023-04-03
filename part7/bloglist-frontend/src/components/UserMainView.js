import { useQuery, useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import blogService from '../services/blogs'
import {
  newBlog,
  getBlogs,
  likeBlog,
  deleteBlog,
} from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

const UserMainView = ({ section }) => {
  const dispatch = useDispatch()
  const { blogs, user } = useSelector((state) => state)

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

  const handleCreate = (newBlogToBeSaved) => {
    newBlogMutation.mutate(newBlogToBeSaved)
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

  return (
    <div style={section}>
      <CreateBlog
        section={section}
        handleCreate={handleCreate}
        blogFormRef={blogFormRef}
      />
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
    </div>
  )
}

export default UserMainView
