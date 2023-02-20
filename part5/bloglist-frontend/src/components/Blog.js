import {useState} from 'react'

const Blog = ({blog ,handleLike}) => {
  const [brief, setBrief] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5
  }

  const reveal = (e) => {
    setBrief(!brief)
  }

  const handleLikeIncrease = () => {
    const newBlog = {
      url: blog.url, 
      author: blog.author, 
      likes: blog.likes + 1, 
      title: blog.title, 
      user: blog.user.id,
      id: blog.id,
    }
    handleLike(newBlog)
  }

  if(brief===false) {
    return (
      <div style={blogStyle}>
        <p><i>{blog.title}</i> by {blog.author} <button onClick={reveal}>Hide</button></p>
        <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
        <p>Likes: {blog.likes} <button onClick={handleLikeIncrease}>Like</button></p>
        <p>{blog.user.name}</p>
      </div>
    )
  }

  return (<div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={reveal}>View</button>
  </div> ) 
}

export default Blog