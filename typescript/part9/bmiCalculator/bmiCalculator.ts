interface bmiType {
  weight: number,
  height: number
}

const parseArgs = (args:string[]):bmiType => {
  if(args.length !== 4) {
      throw new Error('incorrect input. try: npm run bmiCalculator.ts weight height')
  }
  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('incorrect input. try: npm run bmiCalculator.ts weight height')
  }
}

const calculateBmi = (height:number, weight:number) => {
  const score = weight / (height ** 2)
  if(score < 18.5){
      console.log('Under weight');
  } 
  else if (18.5 < score && score < 24.9) {
      console.log('Normal(healthy weight)');
  }  
  else if (25 < score && score < 29.9) {
      console.log('Normal(healthy weight)');
  }  
  else if (30 < score && score < 34.9) {
      console.log('Obesity(class I)');
  }  
  else if (35 < score && score < 39.9) {
      console.log('Obesity(class II)');
  }  
  else if (40 < score) {
      console.log('Exreme obesity');
  } 
}

try{
  const {weight, height} = parseArgs(process.argv)
  calculateBmi(height, weight)
} catch(e:unknown) {
  let errMsg = 'sth went wrong.'
  if(e instanceof Error) {
    errMsg += e.message
  }
  console.log(e);
}
