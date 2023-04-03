import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const IndividualUserView = ({ section }) => {
  const { id } = useParams()
  const { users } = useSelector((state) => state)
  const user = users.find((user) => user.id === id)
  if (!user) {
    return (
      <div style={section}>
        <p>something went wrong.</p>
      </div>
    )
  }
  if (user.blogs.length === 0) {
    return (
      <div style={section}>
        <h2>{user.name}</h2>
        <p>no blogs added.</p>
      </div>
    )
  }

  return (
    <div style={section}>
      <h2>{user.name}</h2>
      <p>added blogs:</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default IndividualUserView
