import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Past from "./WeatherDB"

const Weather = () => {
  //logout handler
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    window.history.forward()
    navigate("/")
  }



  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeatherData = async () => {
    console.log(city)
    const authToken = localStorage.getItem('user')
    if (city === "") {
      window.alert("Please enter a city")
      return
    } else {
      var formData = {
        city: city,
      }
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': authToken
    }

    try {
      const response = await axios.post('http://localhost:3032/weather', formData, { headers });
      console.log(response.data)
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>
      <div className='input'>
        <h1>City Weather App</h1>
        <button onClick={handleLogout}>Logout</button>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            getWeatherData();
          }}
        >
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button type="submit" onSubmit={(event) => {
            event.preventDefault();
            getWeatherData(city);
          }}>Search</button>
        </form>
        {weather && (
          <div>
            <h2>{weather.city}</h2>
            <p>Temperature: {weather.temperature}</p>
            <p>Description: {weather.description}</p>
          </div>
        )}

      </div>
      <div className='past'>
        <Past />
      </div>
    </>
  );
};

export default Weather;
