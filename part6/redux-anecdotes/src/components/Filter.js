import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      const input = event.target.value;
      if(input.length === 0){
        dispatch(setFilter('ALL'))
      } else {
        dispatch(setFilter(input))
      }
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        <label htmlFor='filter-search'>filter</label> 
        <input onChange={handleChange} id='filter-search' type='text'/>
      </div>
    )
  }
  
  export default Filter