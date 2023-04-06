import { useQuery, useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import blogService from '../../services/blogs'
import { newBlog, getBlogs } from '../../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import CreateBlog from '../CreateBlog'

const UserMainView = ({ section }) => {
  const dispatch = useDispatch()
  const { blogs } = useSelector((state) => state)

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

  const result = useQuery(['blogs'], blogService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (blogs) => {
      const blogsOrted = [...blogs].sort((a, b) => b.likes - a.likes)
      dispatch(getBlogs(blogsOrted))
    },
  })

  const handleCreate = (newBlogToBeSaved) => {
    newBlogMutation.mutate(newBlogToBeSaved)
  }
  const handleMessage = (messageObj) => {
    dispatch(setNotification(messageObj, 5))
  }

  return (
    <div style={section}>
      <CreateBlog
        section={section}
        handleCreate={handleCreate}
        blogFormRef={blogFormRef}
      />
      <div>
        {result.isLoading && (
          <>
            <p>Loading blogs...</p>
          </>
        )}
      </div>

      <div>
        {result.isError && (
          <>
            <p>
              Unfortunately, blog service is currently down. Come back later.
            </p>
          </>
        )}
      </div>

      <div>
        <>
          {blogs.map((blog) => (
            <div key={blog.id} style={section}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
        </>
      </div>
    </div>
  )
}

export default UserMainView
