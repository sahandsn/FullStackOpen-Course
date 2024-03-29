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
    setTimeout(()=>setMessage({...message, message:null}), 5000)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    // used name(nodify the number)
    const currentObj = persons.find((ele)=>ele.name===newName.trim())
    // console.log(currentObj);
    if(currentObj!==undefined){
      const confirmation = window.confirm(`${newName.trim()} is already added to the phonebook, modify the number with the new one?`)
      if(confirmation===true){
        services
          .personUpdate(currentObj.id, {number: newNumber, name: newName.trim()})
          .then(({data})=>{
            // console.log(data);
            setPersons(persons.map((ele)=>ele.id!==data.id?ele:data))
            handleMessage({...message, message:`Modified ${newName}`, mode:'green'})
          })
          .catch(err=>{
            console.log(err);
            console.log(err.response.data.name);
            if(err.response.data.name === "ValidationError"){
              // present person tried to be modified with correct number
              handleMessage({...message, message:err.response.data.errors.number.message, mode:'red'})
            }
            else{
              // already deleted person tried to be modified
              setPersons(persons.filter(ele=> currentObj.id !== ele.id))
              handleMessage({...message, message:`Information of ${currentObj.name} does not exist on the database`, mode:'red'})
            } 
          })
      }
      setNewName("")
      setNewNumber("")
    }
    else{
      // empty field
      if(newName==="" || newNumber===""){
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
        .catch(err => {
          // console.log(err);
          handleMessage({...message, message:err.response.data.errors.number.message, mode:'red'})
        })
        setNewName("")
        setNewNumber("")
      }
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
        handleMessage({...message, message:`Information of ${obj.name} does not exist on the database`, mode:'red'})
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