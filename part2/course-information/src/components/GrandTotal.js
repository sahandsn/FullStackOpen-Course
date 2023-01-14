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


  export default GrandTotal