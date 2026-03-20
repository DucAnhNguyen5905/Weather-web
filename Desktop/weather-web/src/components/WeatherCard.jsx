import { useEffect, useRef, useState } from "react";
import "./Weather.css";

import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";

import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherDetails";
import { getCurrentWeather } from "../api/weatherApi";

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
};

const WeatherCard = () => {
  const inputRef = useRef(null);

  const [weatherData, setWeatherData] = useState({
    humidity: "--",
    windSpeed: "--",
    temperature: "--",
    location: "Loading...",
    icon: clear_icon,
  });

  const [error, setError] = useState("");

  const search = async (city) => {
    try {
      const data = await getCurrentWeather(city);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      setError("");
    } catch (err) {
      setError("City not found!");
    }
  };

  const handleSearch = () => {
    const city = inputRef.current.value.trim();

    if (!city) {
      setError("Please enter a city name!");
      return;
    }

    search(city);
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <SearchBar inputRef={inputRef} onSearch={handleSearch} />

      {error && <p className="error-message">{error}</p>}

      <img src={weatherData.icon} alt="weather icon" className="weather-icon" />

      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>

      <WeatherDetails
        humidity={weatherData.humidity}
        windSpeed={weatherData.windSpeed}
      />
    </div>
  );
};

export default WeatherCard;
