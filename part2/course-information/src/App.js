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


const GrandTotal = ({courses}) => {
  // console.log(courses)
  return (<h3>
    Total of {courses.reduce((total, current)=>{
      let currentCourseTotal = current.parts.reduce((all,current)=>all+current.exercises,0)
      return(
        total+currentCourseTotal
      )
        
    }, 0)} exercises in all courses
    
  </h3>)
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'Test',
      id: 3,
      parts: [
        {
          name: 'Routing',
          exercises: 3000,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development Curriculum</h1>
      {courses.map((ele)=><Course course={ele} key={ele.id}/>)}
      <GrandTotal courses={courses} />
    </>
  )
}


export default App