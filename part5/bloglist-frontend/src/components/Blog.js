import {useState} from 'react'

const Blog = ({blog}) => {
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

  if(brief===false) {
    return (
      <div style={blogStyle}>
        <p><i>{blog.title}</i> {blog.author} <button onClick={reveal}>Hide</button></p>
        <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
        <p>Likes: {blog.likes} <button>Like</button></p>
        <p>{blog.user.name}</p>
      </div>
    )
  }

  return (<div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={reveal}>View</button>
  </div> ) 
}

export default Blog