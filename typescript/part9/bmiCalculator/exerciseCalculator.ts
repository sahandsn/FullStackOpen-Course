interface exerciseType { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface exerciseDataType {
  data: number[],
  target: number
}

const parseArgsArr = (args:string[]):exerciseDataType => {
  if(args.length < 4) {
      throw new Error('incorrect input. try: npm run bmiCalculator.ts target data1, ...')
  }
  const [run, app, target, ...data] = args
  const dataArr = data.map(d => Number(d))
  
  if(!isNaN(Number(target)) && dataArr.every(d => !isNaN(d))){
    return {
      data: dataArr, 
      target: Number(target)
    }
  } else {
    throw new Error('incorrect input. try: npm run bmiCalculator.ts target data1, ...')
  }
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

try{
  const {data, target} = parseArgsArr(process.argv)
  const res = calculateExercises(data, target)
  console.log(res);
} catch(e:unknown) {
  let errMsg = 'sth went wrong.'
  if(e instanceof Error) {
    errMsg += e.message
  }
  console.log(e);
}