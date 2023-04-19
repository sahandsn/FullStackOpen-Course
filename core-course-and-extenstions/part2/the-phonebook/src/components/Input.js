const Input = ({text, value, onChange}) => {
    return (
      <div>
        {text}: <input onChange={onChange} value={value}/>
      </div>
      
    )
  }


  export default Input