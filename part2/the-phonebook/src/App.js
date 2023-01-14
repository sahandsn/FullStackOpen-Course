import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "09990000000" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // used name
    if(persons.map(obj=>obj.name).includes(newName)){
      alert(`${newName} is already added to the phonebook`)
      setNewName("")
      setNewNumber("")
    }
    // e,pty field
    else if(newName==="" || newNumber===""){
      alert(`both fields should be filled`)
    }
    // no error
    else{
      const obj = {name: newName, number: newNumber}
      setPersons(persons.concat(obj))
      setNewName("")
      setNewNumber("")
    }
    
  }

  const typingName = (event) => {
    setNewName(event.target.value)
  }
  const typingNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={typingName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={typingNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((ele)=><p key={ele.name}>{ele.name}; {ele.number}</p>)}
    </>
  )
}


export default App