import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../../reducers/blogsReducer'
import { useState } from 'react'
import blogService from '../../services/blogs'

const Comments = ({ section, blog, handleMessage }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addCommentMutation = useMutation(blogService.updateOne, {
    onSuccess: (updatedBlog) => {
      dispatch(commentBlog(updatedBlog))
      handleMessage({
        message: `blog ${updatedBlog.title} commented`,
        mode: 'green',
      })
    },
    onError: () => {
      handleMessage({
        message: 'blog was not commented',
        mode: 'red',
      })
    },
  })

  const handleComment = (newBlog) => {
    addCommentMutation.mutate(newBlog)
  }

  const addCommentHandler = async (e) => {
    e.preventDefault()
    if (comment.trim() === '') {
      handleMessage({
        message: 'empty comments are not allowed',
        mode: 'red',
      })
    } else {
      const newBlog = {
        ...blog,
        user: blog.user.id,
        comments: [...blog.comments, comment.trim()],
      }
      handleComment(newBlog)
    }
    setComment('')
  }

  if (blog.comments.length === 0) {
    return (
      <div style={section}>
        <h2>Comments</h2>
        <form onSubmit={addCommentHandler}>
          <textarea
            rows='5'
            cols='30'
            placeholder='write your (anonymous) comment'
            name='comment'
          ></textarea>
          <button type='submit'>save</button>
        </form>
        <p>no comments added yet.</p>
      </div>
    )
  }

  return (
    <div style={section}>
      <h2>Comments</h2>
      <form onSubmit={addCommentHandler}>
        <textarea
          rows='5'
          cols='30'
          placeholder='write your (anonymous) comment'
          name='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></textarea>
        <button type='submit'>save</button>
      </form>
      <ul>
        {blog.comments.map((v, i) => (
          <li key={i}> {v} </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
