import styles from "./Notification.module.css"

const Notification = ({message:{message, mode}}) => {
    // console.log(message);
    if(message===null){
        return null
    }
    if(mode==='green'){
        return(
            <div className={styles.green}>{message}</div>
        )
    }
    else if(mode==='red'){
        return(
            <div className={styles.red}>{message}</div>
        )
    }
    // user modified the input
    else{
        return(
            <div className={styles.gray}>{message}</div>
        )
    }
    
}


export default Notification