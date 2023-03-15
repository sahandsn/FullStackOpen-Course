import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog ,handleLike, handleDelete, user }) => {
  const [brief, setBrief] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5
  }

  const reveal = () => {
    setBrief(!brief)
  }

  const handleLikeIncrease = () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    handleLike(newBlog)
  }
  const handleDeleteBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }

  if(brief===false) {
    return (
      <div style={blogStyle} className='blog'>
        <p><i>{blog.title}</i> by {blog.author} <button onClick={reveal}>Hide</button></p>
        <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
        <p>Likes: {blog.likes} <button onClick={handleLikeIncrease}>Like</button></p>
        <p>{blog.user.username}</p>
        {blog.user.username === user.username && <button onClick={handleDeleteBlog}>Remove</button>}
      </div>
    )
  }

  return (<div style={blogStyle} className='blog'>
    {blog.title} {blog.author} <button onClick={reveal}>View</button>
  </div> )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog