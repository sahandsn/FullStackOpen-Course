import LoginForm from './LoginForm'
import Notification from './Notification/Notification'

const LoginView = () => {
  return (
    <div>
      <Notification />
      <h2>Login to Application</h2>
      <LoginForm />
    </div>
  )
}

export default LoginView
