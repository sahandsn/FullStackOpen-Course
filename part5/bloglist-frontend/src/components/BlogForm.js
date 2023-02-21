import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title: <input type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author: <input type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url: <input type='url' name='url' value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm