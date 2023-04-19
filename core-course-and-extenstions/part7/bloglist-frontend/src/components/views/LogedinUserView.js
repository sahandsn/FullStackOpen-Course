import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { nullUser } from '../../reducers/userReducer'
import { Button } from 'react-bootstrap'

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
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default LogedinUserView
