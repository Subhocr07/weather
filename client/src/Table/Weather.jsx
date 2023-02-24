import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeatherData = async () => {
    console.log(city)
    const authToken = localStorage.getItem('user')
    try {
      const response = await axios.post('http://localhost:3032/weather', { city });
      console.log(response.data)
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div>
      <h1>City Weather App</h1>
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
  );
};

export default Weather;
