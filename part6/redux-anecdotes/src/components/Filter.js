import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      const input = event.target.value;
      if(input.length === 0){
        dispatch(filter('ALL'))
      } else {
        dispatch(filter(input))
      }
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        <label for='filter-search'>filter</label> 
        <input onChange={handleChange} id='filter-search' type='text'/>
      </div>
    )
  }
  
  export default Filter