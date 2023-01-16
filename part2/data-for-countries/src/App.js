import {useEffect, useState } from 'react'
import axios from "axios"


const Input = ({text, value, onChange}) => {
  return (
    <div>
      {text} <input value={value} onChange={onChange} />
    </div>
  )
}


const CountryFinder = ({countries, search, setSearch}) => {
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

  const CountryProfileHandler = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value)
  }
  // [2,10] countries matched this search
  if(matchedCountries.length<=10 && matchedCountries.length>=2){
    return (
      <div>
        <ul>
          {matchedCountries.map(obj=>{
            // console.log(obj.name.common);
            return (
              <li key={obj.cca3}>{obj.name.common}; {obj.name.official} <button value={obj.name.common} onClick={CountryProfileHandler}>show</button></li>
            )
          })}
        </ul>
      </div>
    )
  }

  // country found!
  if(matchedCountries.length === 1){
    return (
      <CountryProfile country={matchedCountries[0]} />
    )
  }
}

const CountryProfile = ({country}) => {
  return (
    <>
        <h2>{country.name.common}</h2>

        <figure>
          <img alt={country.name.common} src={country.flags.png} loading="eager" />
          <figcaption>{country.name.official}</figcaption>
        </figure>

        <h3>Geography</h3>
        <ul>
          <b>Capital(s):</b>
            <ul>
              {country.capital.map((city)=><li key={city}>{city}</li>)}
            </ul>
          <p><b>Area(km<sup>2</sup>):</b> {new Intl.NumberFormat().format(country.area)}</p>
        </ul>
        
        <h3>Anthropology</h3>
        <ul>
        <b>Language(s):</b>
          <ul>
            {Object.keys(country.languages).map((lang)=><li key={lang}>{country.languages[lang]}</li>)}
          </ul>
          <p><b>Population:</b> {new Intl.NumberFormat().format(country.population)}</p>
        </ul>
      </>
  )
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
      <h1>Explore Countries</h1>
      <Input text={'find countries:'} value={search} onChange={searchOnChange} />
      <CountryFinder countries={countries} search={search.trim()} setSearch={setSearch}/>
    </>
  );
}


export default App;
