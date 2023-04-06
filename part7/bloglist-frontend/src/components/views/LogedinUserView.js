import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { nullUser } from '../../reducers/userReducer'

const LogedinUserView = ({ section }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(nullUser())
  }
  return (
    <div style={section}>
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogedinUserView
