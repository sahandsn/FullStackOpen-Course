import { Link } from 'react-router-dom'

const Menu = ({ section }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div style={section}>
      <h1>blogs</h1>
      <Link to='/' style={padding}>
        blogs
      </Link>
      <Link to='/users' style={padding}>
        users
      </Link>
    </div>
  )
}

export default Menu
