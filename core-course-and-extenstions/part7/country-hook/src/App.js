import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name.trim()}?fullText=true`)
      .then((res) => {
        console.log(res.data)
        setCountry(res.data[0])
      })
      .catch((error) => {
        console.log(error.message)
        setCountry(null)
      })
  }, [name])

  if (name === '') {
    return null
  }

  if (!country) {
    return []
  }

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.length === 0) {
    return <div>not found!</div>
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height='100'
        alt={`flag of ${country.name.official}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
