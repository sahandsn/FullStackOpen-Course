import { useEffect, useState } from 'react'
import axios from "axios"


const Search = ({persons, newSearchValue, searchOnChange}) => {
  if (newSearchValue===""){
    return(
      <>
        <h2>Search</h2>
        <div>
          <Input text={'Search name with'} value={newSearchValue} onChange={searchOnChange} />
          <p>type name to find</p>
        </div>
      </>
    )
  }

  const regex = new RegExp(newSearchValue, "ig")
  let matchedNames = persons.filter((ele)=>regex.test(ele.name))
  if(matchedNames.length === 0){
    return (
      <>
        <h2>Search</h2>
        <div>
          <Input text={'Search name with'} value={newSearchValue} onChange={searchOnChange} />
          <p>No Match!</p>
        </div>
      </>
    )
  }

  return (
    <>
      <h2>Search</h2>
      <div>
        <Input text={'Search name with'} value={newSearchValue} onChange={searchOnChange} />
        <Contacts list={matchedNames}/>
      </div>
    </>
    
  )
}


const Contacts = ({list}) => {
  return (
    <ul>
      {list.map((ele)=><li key={ele.name}>{ele.name}; {ele.number}</li>)}
    </ul>
  )
}


const Add = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => {
  return (
    <>
      <h2>Add</h2>
      <div>
        <form onSubmit={onSubmit}>
          <Input text={'name'} value={nameValue} onChange={nameOnChange} />
          <Input text={'number'} value={numberValue} onChange={numberOnChange} />
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    </>
  )
}

const List = ({persons}) => {
  return (
    <>
      <h2>List</h2>
      <div>
        <Contacts list={persons} />  
      </div>
    </>
  )
}

const Input = ({text, value, onChange}) => {
  return (
    <div>
      {text}: <input onChange={onChange} value={value}/>
    </div>
    
  )
}

const App = () => {
  // states of the App root component
  const [persons, setPersons] = useState([
    { name: 'LOADING NAMES', number: 'LOADING NUMBERS'},
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  // fetch data from json-server
  useEffect(()=>{
    console.log("promise pending...");
    axios
      .get("http://localhost:3001/persons")
      .then(response=>{
        console.log("promise resolved")
        setPersons(response.data)
      })
  },[])
  // console.log(persons);

  const handleSubmit = (event) => {
    event.preventDefault()
    // used name
    if(persons.map(obj=>obj.name).includes(newName)){
      alert(`${newName} is already added to the phonebook`)
      setNewName("")
      setNewNumber("")
    }
    // empty field
    else if(newName==="" || newNumber===""){
      alert(`both fields of Add section should be filled`)
    }
    // no error
    else{
      const obj = {name: newName.trim(), number: newNumber}
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
      <Search persons={persons} newSearchValue={newSearch} searchOnChange={typingSearch}/>
      <Add onSubmit={handleSubmit} nameValue={newName} nameOnChange={typingName} numberValue={newNumber} numberOnChange={typingNumber} />
      <List persons={persons}/>
    </>
  )
}


export default App