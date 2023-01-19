const Contacts = ({list, deleteHandler}) => {
    return (
      <div>
        <ul>
          {list.map((ele)=><li key={ele.name}>{ele.name}; {ele.number} <button onClick={() => deleteHandler(ele)}>delete</button></li>)}
        </ul>
      </div>
      
    )
  }


  export default Contacts