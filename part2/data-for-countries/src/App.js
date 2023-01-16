import {useEffect, useState } from 'react'
import axios from "axios"


const Input = ({text, value, onChange}) => {
  return (
    <div>
      {text} <input value={value} onChange={onChange} />
    </div>
  )
}


const CountryFinder = ({countries, search}) => {
  // have not typed any thing
  if(search === ""){
    return (
      <></>
    )
  }
  // started typing
  const matchedCountries = countries.filter((obj)=>{
    const regex = new RegExp(search, "i")
    if(regex.test(obj.name.commin) || regex.test(obj.name.official)){
      return true
    }else{
      return false
    }
  })
  // console.log(matchedCountries)
  
  // no country matched this search
  if(matchedCountries.length===0){
    return (
      <p>No Matched Country!</p>
    )
  }

  // too many countries matched this search
  if(matchedCountries.length>10){
    return (
      <p>Too Many Countries! Be More Specific.</p>
    )
  }

  // [2,10] countries matched this search
  if(matchedCountries.length<=10 && matchedCountries.length>=2){
    return (
      <div>
        <ul>
          {matchedCountries.map(obj=>{
            return (
              <li key={obj.cca3}>{obj.name.common}; {obj.name.official}</li>
            )
          })}
        </ul>
      </div>
    )
  }

  // country found!
  if(matchedCountries.length === 1){
    return (
      <>
        <h2>{matchedCountries[0].name.common}</h2>
        <figure>
          <img alt={matchedCountries[0].name.common} src={matchedCountries[0].flags.png} loading="eager" />
          <figcaption>{matchedCountries[0].name.official}</figcaption>
        </figure>
        <h3>Geography</h3>
        <div>
          <b>Capital(s):</b>
          <ul>
            {matchedCountries[0].capital.map((city)=><li key={city}>{city}</li>)}
          </ul>
          <p><b>Area(km<sup>2</sup>):</b> {new Intl.NumberFormat().format(matchedCountries[0].area)}</p>
        </div>
        
        <h3>Anthropology</h3>
        <div>
          <p><b>Population:</b> {new Intl.NumberFormat().format(matchedCountries[0].population)}</p>
          <b>Language(s):</b>
          <ul>
            {Object.keys(matchedCountries[0].languages).map((lang)=><li key={lang}>{matchedCountries[0].languages[lang]}</li>)}
          </ul>
        </div>
      </>
      
    )
  }
}


function App() {

  //states
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')


  // fetch data 
  useEffect(()=>{
    // console.log('promis pending...')
    axios 
      .get("https://restcountries.com/v3.1/all")
      .then(response=>setCountries(response.data))
  },[])
  // console.log(countries)
  

  // event handlers
  const searchOnChange = (event) => {
    setSearch(event.target.value)
  }


  return (
    <>
      <h1>Country Finder</h1>
      <Input text={'find countries:'} value={search} onChange={searchOnChange} />
      <CountryFinder countries={countries} search={search} />
    </>
  );
}


export default App;
