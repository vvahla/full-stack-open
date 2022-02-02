import React, { useState, useEffect } from 'react';
import axios from 'axios'

const RenderCountries = ( {countries, weather, setWeather, setNewSearch} ) => {  
  if(countries.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length <= 10 && countries.length > 1) {
    console.log(countries.length);
    return(
      <ul>
      {countries.map(country => {
        return (
          <div key={country.id}>
            <p key={country.name.common}>{country.name.common}</p>
            <button key={country.name} onClick={() => {
              setNewSearch(country.name.common);
            }}>show</button>
          </div>
        )
      }
      )}
      </ul>
    )
  } else if (countries.length === 1) {
    const finalCountry = countries[0]
    const finalLanguages = Object.values(finalCountry.languages)

    return(
      <div>
        <h1>{finalCountry.name.common}</h1>
        <p>Capital {finalCountry.capital[0]}</p>
        <p>Population {finalCountry.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {finalLanguages.map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={finalCountry.flags.png}/>
        <h2>Weather in {finalCountry.capital[0]}</h2>
        <RenderWeather countries={countries} weather={weather} setWeather={setWeather} />
      </div>
    )
  } else {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
}

const RenderWeather = ( {countries, weather, setWeather} ) => {
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect');

    const eventHandler = response => {
      console.log('promise fulfilled')
      setWeather(response.data)
    }

    const promise = axios.get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + countries[0].name.common)
    promise.then(eventHandler);
  }, [])

  console.log(weather.current)
  return (
    <>
      <p><b>temperature:</b> {weather?.current?.temperature ?? 'Loading...'} Celsius</p>
      <img src={weather?.current?.weather_icons[0] ?? ''} />
      <p><b>wind: </b>{weather?.current?.wind_speed ?? 'Loading...'} mph, direction: {weather?.current?.wind_dir ?? 'Loading...'}</p>
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');

  const [weather, setWeather] = useState({});

  useEffect(() => {
    console.log('effect');

    const eventHandler = response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    }

    const promise = axios.get('https://restcountries.com/v3.1/all')
    promise.then(eventHandler);
  }, [])

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
  }
  const searchedCountries = countries.filter(country => country.name.common.toUpperCase().includes(newSearch.toUpperCase()))

  return (
      <div>
        {console.log(searchedCountries)}
        find countries 
        <input
        value={newSearch}
        onChange={handleSearchChange}
        />
        <RenderCountries countries={searchedCountries} weather={weather} setWeather={setWeather} setNewSearch={setNewSearch}/>
      </div>
  );
}

export default App;