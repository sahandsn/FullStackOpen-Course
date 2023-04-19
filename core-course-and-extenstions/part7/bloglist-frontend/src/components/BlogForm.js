import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
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
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          placeholder='Bloglist title'
          name='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id='title'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type='text'
          placeholder='Bloglist author'
          name='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id='author'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control
          type='url'
          placeholder='Bloglist title'
          name='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id='url'
        />
        <Form.Text className='text-muted'>
          Let others enjoy this as well.
        </Form.Text>
      </Form.Group>
      <Button type='submit'>Create</Button>
    </Form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm
