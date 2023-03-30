import { createContext, useReducer, useContext } from 'react'


const anecdotesReducer = (state, action) => {
    switch(action.type){
        case 'CREAT':
            return `anecdote '${action.payload}' created`
        case 'VOTE':
            return `anecdote '${action.payload.content}' voted`
        case 'ERROR_SHORT':
            return `too short anecdote, must have length 5 or more`
      default: 
        return null
    }
}

const AnecdotesContext = createContext()

export default AnecdotesContext

export const AnecdotesContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(anecdotesReducer, null)
    return (
        <AnecdotesContext.Provider value={[notification, notificationDispatch]} >
            {props.children}
        </AnecdotesContext.Provider>
    )
}

export const useNotificationValue = () => {
    const NotificationAndDispatch = useContext(AnecdotesContext)
    return NotificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const NotificationAndDispatch = useContext(AnecdotesContext)
    return NotificationAndDispatch[1]
}

// export const useSetNotification = (type, payload, seconds) => {
//     const dispatch = useNotificationDispatch()
//     dispatch({type, payload})
//     setTimeout(() => {
//       dispatch({type: null})
//     }, seconds * 1000)
// }