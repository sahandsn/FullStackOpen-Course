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


// const Total = (props) => {
//   console.log(props)
//   return (<div>
//     <p>Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}</p>
//   </div>)
// }


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
      }
    ]
  }

  return <Course course={course} />
}


export default App