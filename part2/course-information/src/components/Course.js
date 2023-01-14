const Course = ({course:{name, parts}}) => {
    // console.log(parts)
    return (
      <>
        <Header name={name}/>
        <Content parts={parts}/>
        <Total parts={parts} />
      </>
    )
  }
  
  
  const Header = ({name}) => {
    // console.log(name);
    return (
      <h2>{name}</h2>
    )
  }
  
  
  const Content = ({parts}) => {
    // console.log(parts)
    return (
      <ul> 
      {parts.map((element) => {
        // console.log(element.id.toString())
        return (
          <Part part={element.name} exercise={element.exercises} key={element.id.toString()} />
        )
      })}
      
    </ul>)
  }
  
  
  const Part = ({part, exercise}) => {
    // console.log(exercise);
    return (
      <>
        <li>
          {part} {exercise}
        </li>
      </>
    )
    
  }
  
  
  const Total = ({parts}) => {
    return (
      <ul>
        <b>
          total of {parts.reduce((total, current)=>{
            return(
              total+current.exercises
            )
          }, 0)} exercises in this course
        </b>
      </ul>
      
    )
  }

  
export default Course