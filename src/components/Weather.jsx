import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import clear_icon from '../assets/search-icon.png'
import clear_icon from '../assets/weather-cloud.png'
import cloud_icon from '../assets/weather-cloudly sun.png'
import clear_icon from '../assets/weather-hot.png'
import clear_icon from '../assets/weather-very hot.png'
import rain_icon from '../assets/weather-rain sun.png'
import rain_icon from '../assets/weather-rain.png'
import rain_icon from '../assets/weather-very rain.png'
import rain_icon from '../assets/weather-thunderbolt.png'
import underlines_icon from '../assets/underlines.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setweatherData] = useState(false);

  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "010d": rain_icon,
    "010n": rain_icon,
    "013d": snow_icon,
    "013n": snow_icon,
  }

  const search = async (city) => {
    if(city === ""){
      alart("Enter City Name")
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;


      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alart(data.message);
        return;
      }

      const icon = allIcon[data.weather[0].icon] ||clear_icon
      setweatherData({
        humidity: data.main.humidity,
        wind: data.main.wind,
        tempareture: Math.floor(data.main.temp),
        location: data.name,
        icon: icon

      })
      console.log(data)

    }
    catch (error) {

    }
  }

  useEffect(() => {
    search("London")
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={weatherData.icon} alt="" onClick={{()=> search(inputRef.current.value)}} />
      </div>
      <img src={cloud_icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.tempareture}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className='{weather-data}'>
        <div className='col'>
          <img src={underlines_icon} alt="" />
          <div>
            <p>91%</p>
            <span>Humidity</span>
          </div>
        </div><div className='col'>
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed}Km/h</p>
            <span>Wind speed</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Weather
