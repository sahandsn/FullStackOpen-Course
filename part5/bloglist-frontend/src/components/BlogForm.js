import blogsService from '../services/blogs'
import { useState } from 'react'

const BlogForm = ({setBlogs, blogs}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newBlog = {title, author, url}
        try{
            const savedBlog = await blogsService.createOne(newBlog)
            setBlogs(blogs.concat(savedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            
        } catch(exeption) {
            console.warn(exeption)
        }
      }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                title: <input type='text' name='title' value={title} onChange={({target}) => setTitle(target.value)} />
            </div>
            <div>
                author: <input type='text' name='author' value={author} onChange={({target}) => setAuthor(target.value)} />
            </div>
            <div>
                url: <input type='url' name='url' value={url} onChange={({target}) => setUrl(target.value)} />
            </div>
            <button type='submit'>Create</button>
        </form>
    )
}

export default BlogForm