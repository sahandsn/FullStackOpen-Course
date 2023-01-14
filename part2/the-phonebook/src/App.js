import { useState } from 'react'

const Search = ({persons, newSearch}) => {
  if (newSearch===""){
    return(
      <p>type name to find</p>
    )
  }
  // console.log(newSearch)
  const regex = new RegExp(newSearch, "ig")
  // console.log(regex.test(persons[0].name));
  let matchedNames = persons.filter((ele)=>regex.test(ele.name))
  // console.log(matchedNames)
  if(matchedNames.length === 0){
    return (
      <p>No Match!</p>
    )
  }

  return (
    <ul>
      {matchedNames.map((ele)=><li key={ele.name}>{ele.name}; {ele.number}</li>)}
    </ul>
  )
  
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

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
      alert(`both fields of Add section should be filled`)
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
  const typingSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <div>
        Search name with: <input value={newSearch} onChange={typingSearch}/>
        <Search persons={persons} newSearch={newSearch} />
      </div>
      <h2>Add</h2>
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
      <h2>List</h2>
      {persons.map((ele)=><p key={ele.name}>{ele.name}; {ele.number}</p>)}
    </>
  )
}


export default App