import { useNotificationValue } from '../AnecdotesContex'

const Notification = () => {
  const notification = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification === null) return null

  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
