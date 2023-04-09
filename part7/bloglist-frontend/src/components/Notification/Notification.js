import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { message, mode } = useSelector(({ notification }) => notification)
  if (message === null) {
    return null
  }
  if (mode === 'green') {
    return (
      <Alert variant='success'>
        <Alert.Heading>Done!</Alert.Heading> <p>{message}</p>
      </Alert>
    )
  } else if (mode === 'red') {
    return (
      <Alert variant='danger'>
        <Alert.Heading>Error!</Alert.Heading> <p>{message}</p>
      </Alert>
    )
  }
  // user modified the input
  else {
    return <Alert variant='secondary'>{message}</Alert>
  }
}

export default Notification
