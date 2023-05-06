import { NotificationType } from '../../../types/diary'

const Notification = ({ text, mode } : NotificationType) => {
  // console.log(message);
  if (text === null) {
    return null
  }
  if (mode === 'green') {
    return (
      <div style={{color: 'green'}}>{text}</div>
    )
  }
  else if (mode === 'red') {
    return (
      <div style={{color: 'red'}}>{text}</div>
    )
  }
  // user modified the input
  else {
    return (
      <div style={{color: 'black'}}>{text}</div>
    )
  }

}


export default Notification