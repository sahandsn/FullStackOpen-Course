const Course = ({course}) => {
  // console.log(course.parts[0].name)
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
}


const Header = ({name}) => (
    <h1>{name}</h1>
)


const Part = ({part, exercise}) => {
  // console.log(exercise);
  return (
    <>
      <p>
        {part} {exercise}
      </p>
    </>
  )
  
}


const Content = ({parts}) => {
  // console.log(parts)
  return (
    <div> 
    {parts.map((element) => {
      // console.log(element.id.toString())
      return (
        <Part part={element.name} exercise={element.exercises} key={element.id.toString()} />
      )
    })}
  </div>)
}


const Total = ({parts}) => {
  // console.log()
  return (<div>
    <strong>
      total of {parts.reduce((total, current)=>{return (total+current.exercises)}, 0)} exercises
    </strong>
  </div>)
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <>
      <Course course={course} />
      <Total parts={course.parts} />
    </>
  )
}


export default App