import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import LoginView from './components/LoginView'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification/Notification'
import blogService from './services/blogs'
import MenuView from './components/views/MenuView'
import { setUser } from './reducers/userReducer'
import LogedinUser from './components/views/LogedinUserView'
import UsersView from './components/views/UsersListView'
import UserMainView from './components/views/UserMainView'
import IndividualUserView from './components/views/IndividualUserView'
import IndividualBlogView from './components/views/IndividualBlogView'

const App = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)

  const section = {
    border: 'solid',
    borderWidth: 1,
    margin: '5px',
    padding: '5px',
  }

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      handleMessage({ message: `welcome back ${user.name}`, mode: 'green' })
      blogService.setToken(user.token)
    }
  }, [])

  const handleMessage = (messageObj) => {
    dispatch(setNotification(messageObj, 5))
  }

  if (user === null) {
    return <LoginView />
  }

  return (
    <>
      <Notification />
      <MenuView section={section} />
      <LogedinUser section={section} />
      <Routes>
        <Route path='/' element={<UserMainView section={section} />} />
        <Route path='/blogs/:id' element={<IndividualBlogView />} />
        <Route path='/users' element={<UsersView section={section} />} />
        <Route
          path='/users/:id'
          element={<IndividualUserView section={section} />}
        />
      </Routes>
    </>
  )
}

export default App
