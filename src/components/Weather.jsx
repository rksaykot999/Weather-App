import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import hot_icon from '../assets/weather-hot.png'
import search_icon from '../assets/search-icon.png'
import clear_icon from '../assets/weather-hot.png'
import cloud_icon from '../assets/weather-hot.png'
import drizzle_icon from '../assets/weather-hot.png'
import rain_icon from '../assets/weather-hot.png'
import snow_icon from '../assets/weather-hot.png'
import humidity_icon from '../assets/underlines.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {
  const [weatherData, setweatherData] = useState(false);
  const allIcons = {
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
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }
  const search = async (city)=>{
    try{
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
      allIcons.find(icon => icon === data.weather[0].icon) || clear_icon;
      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error){

    }
  }
  useEffect(()=>{
    search("London");
  },[])
  return (
    <div className='weather'>
      <div className='search-bar'>
        <input type="text" placeholder='Search'/>
        <img src={search_icon} alt=""/>
      </div>
      <img src={hot_icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>London</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Weather
