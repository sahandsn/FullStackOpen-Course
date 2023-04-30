interface exerciseType { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (data: number[], target:number) : exerciseType => {
  const average = data.reduce((total, current) => {
    return total + current
  }, 0) / data.length

  const rating = average === target ? 3 : average >= target/2 ? 2 : 1 

  let ratingDescription
  switch (rating) {
    case 3:
      ratingDescription = 'congradulations! you reached your goal.'
      break;
    case 2:
      ratingDescription = 'not too bad but could be better.'
      break;
    default:
      ratingDescription = 'it is ok if you felt lazy a little.'
      break;
  }

  const res = {
    periodLength: data.length,
    trainingDays: data.filter(d => d !== 0).length,
    success: average === target,
    rating,
    ratingDescription,
    target,
    average
  }

  return res

}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));