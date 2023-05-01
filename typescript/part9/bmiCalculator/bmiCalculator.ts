interface bmiType {
  weight: number
  height: number
}
const parseArgs = (args: string[]): bmiType => {
  if (args.length !== 4) {
    throw new Error(
      'incorrect input. try: npm run bmiCalculator.ts weight height'
    )
  }
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    }
  } else {
    throw new Error(
      'incorrect input. try: npm run bmiCalculator.ts weight height'
    )
  }
}

export const calculateBmi = (heightCM: number, weightKG: number) => {
  const score = weightKG / (heightCM / 100) ** 2
  if (score < 18.5) {
    return 'Under weight'
  } else if (18.5 < score && score < 24.9) {
    return 'Normal(healthy weight)'
  } else if (25 < score && score < 29.9) {
    return 'Normal(healthy weight)'
  } else if (30 < score && score < 34.9) {
    return 'Obesity(class I)'
  } else if (35 < score && score < 39.9) {
    return 'Obesity(class II)'
  } else if (40 < score) {
    return 'Exreme obesity'
  } else {
    return 'sth went wrong.'
  }
}

try {
  const { weight, height } = parseArgs(process.argv)
  const msg = calculateBmi(height, weight)
  console.log(msg)
} catch (e: unknown) {
  let errMsg = 'sth went wrong.'
  if (e instanceof Error) {
    errMsg += e.message
  }
  console.log(errMsg)
}
