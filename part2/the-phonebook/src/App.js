import { useEffect, useState } from 'react'
import services from './components/services.js'
import Add from "./components/Add.js"
import Contacts from "./components/Contacts.js"
import Search from "./components/Search.js"
import Notification from "./components/Notification/Notification.js"


const App = () => {
  // states of the App root component
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState({message:null, mode:'green'})

  // fetch data from json-server on the first load of the app
  useEffect(()=>{
    services
    .getAll()
    .then(({data})=>setPersons(data))
  },[])
 

  // handlers
  const handleMessage = (newMessage) => {
    setMessage(newMessage)
    setTimeout(()=>setMessage({...message, message:null}), 4000)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    // used name(nodify the number)
    const currentObj = persons.find((ele)=>ele.name===newName.trim())
    if(currentObj!==undefined){
      const confirmation = window.confirm(`${newName.trim()} is already added to the phonebook, modify the number with the new one?`)
      if(confirmation===true){
        services
          .partialUpdate(currentObj.id, {number: newNumber})
          .then(({data})=>{
            setPersons(persons.map((ele)=>ele.id!==data.id?ele:data))
            handleMessage({...message, message:`Modified ${newName}`, mode:'green'})
          })
          .catch((response)=>alert(response.response.statusText))
      }
      setNewName("")
      setNewNumber("")
    }

    // empty field
    else if(newName==="" || newNumber===""){
      alert(`both fields of Add section should be filled`)
    }

    // no error(add this name/number)
    else{
      const obj = {name: newName.trim(), number: newNumber}
      services
      .createNew(obj)
      .then(({data})=>{
        // console.log(data);
        setPersons(persons.concat(data))
        handleMessage({...message, message:`Added ${obj.name}`, mode:'green'})
        // console.log('added');
      })
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
  const handleDelete = (obj) => {
    // console.log(ele);
    services
    .deleteObj(obj)
    .then(id=>{
        setPersons(persons.filter(ele=> ele.id !== id))
        handleMessage({...message, message:`Information of ${obj.name} is removed from server`, mode:'green'})
      }
    )
    .catch((err)=>{
      // tried to delete a non-existing(already deleted) obj
      if(err!==undefined){
        setPersons(persons.filter(ele=> obj.id !== ele.id))
        handleMessage({...message, message:`Information of ${obj.name} has already been removed from server`, mode:'red'})
      }

      // did not approave the deletion though window.confirm
    })
    
  }

  // render to screen
  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <h2>Search</h2>
      <Search persons={persons} newSearchValue={newSearch} searchOnChange={typingSearch} deleteHandler={handleDelete}/>
      <h2>Add</h2>
      <Add onSubmit={handleSubmit} nameValue={newName} nameOnChange={typingName} numberValue={newNumber} numberOnChange={typingNumber} />
      <h2>List</h2>
      <Contacts list={persons} deleteHandler={handleDelete}/>
    </>
  )
}


export default App