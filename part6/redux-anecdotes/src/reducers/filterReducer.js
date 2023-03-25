const reducer = (state = 'ALL', action) => {
    // console.log('state now: ', state)
    // console.log('action', action)
    switch(action.type){
      case "SET_FILTER":
        return action.payload
      default: 
        return state;
    }
  }
  
  // action creator for filter
  export const filter = (value) => {
    return {
      type: 'SET_FILTER',
      payload: value
    }
  }

  export default reducer
