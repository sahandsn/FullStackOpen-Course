import Contacts from "./Contacts.js"
import Input from "./Input.js"

const Search = ({persons, newSearchValue, searchOnChange, deleteHandler}) => {
    if (newSearchValue===""){
      return(
        <div>
            <Input text={'Search name with'} value={newSearchValue} onChange={searchOnChange} />
            <p>type name to find</p>
        </div>
      )
    }
  
    const regex = new RegExp(newSearchValue, "i")
    // console.log(regex);
    let matchedNames = persons.filter(ele=>regex.test(ele.name))
  
    if(matchedNames.length === 0){
      return (
        <div>
          <Input text={'Search name with'} value={newSearchValue} onChange={searchOnChange} />
          <p>No Match!</p>
        </div>
      )
    }
  
    return (
  
      <div>
        <Input text={'Search name with'} value={newSearchValue} onChange={searchOnChange} />
        <Contacts list={matchedNames} deleteHandler={deleteHandler}/>
      </div>
    
      
    )
  }


  export default Search