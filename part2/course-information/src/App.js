import Course from "./components/Course.js"
import GrandTotal from "./components/GrandTotal.js"


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
    },
    {
      name: 'Test 2',
      id: 4,
      parts: [
        {
          name: 'Routing',
          exercises: 3000,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 6,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development Curriculum</h1>
      {courses.map((ele)=><Course course={ele} key={ele.id.toString()}/>)}
      <GrandTotal courses={courses} />
    </>
  )
}


export default App