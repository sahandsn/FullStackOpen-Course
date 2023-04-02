import { useSelector } from 'react-redux'
import styles from './Notification.module.css'

const Notification = () => {
  // { message: { message, mode } }
  // console.log(message);
  const { message, mode } = useSelector(({ notification }) => notification)
  if (message === null) {
    return null
  }
  if (mode === 'green') {
    return <div className={`${styles.green} success`}>{message}</div>
  } else if (mode === 'red') {
    return <div className={`${styles.red} error`}>{message}</div>
  }
  // user modified the input
  else {
    return <div className={`${styles.gray} unnatural`}>{message}</div>
  }
}

export default Notification
