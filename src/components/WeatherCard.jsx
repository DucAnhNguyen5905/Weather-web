import { useEffect, useRef, useState } from "react";
import "./Weather.css";

import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherDetails";
import ForecastList from "./ForecastList";
import { getCurrentWeather, getForecast } from "../api/weatherApi";

const WeatherCard = () => {
  const inputRef = useRef(null);

  const [weatherData, setWeatherData] = useState({
    humidity: "--",
    windSpeed: "--",
    temperature: "--",
    location: "Loading...",
    country: "",
    condition: "",
    feelsLike: "--",
    pressure: "--",
    icon: "",
    dateTime: "",
  });

  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async (city) => {
    try {
      setError("");
      setLoading(true);

      const currentData = await getCurrentWeather(city);
      const forecastResponse = await getForecast(city);

      const localDate = new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      setWeatherData({
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed,
        temperature: Math.round(currentData.main.temp),
        location: currentData.name,
        country: currentData.sys.country,
        condition: currentData.weather[0].main,
        feelsLike: Math.round(currentData.main.feels_like),
        pressure: currentData.main.pressure,
        icon: currentData.weather[0].icon,
        dateTime: localDate,
      });

      const dailyMap = {};

      forecastResponse.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!dailyMap[date]) {
          dailyMap[date] = item;
        }
      });

      const filteredForecast = Object.values(dailyMap).slice(0, 3);
      setForecastData(filteredForecast);
    } catch (err) {
      setError("City not found!");
      setWeatherData({
        humidity: "--",
        windSpeed: "--",
        temperature: "--",
        location: "Not found",
        country: "",
        condition: "",
        feelsLike: "--",
        pressure: "--",
        icon: "",
        dateTime: "",
      });
      setForecastData([]);
    } finally {
      setLoading(false);
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
    <div className="weather-page">
      <div className="search-panel">
        <SearchBar inputRef={inputRef} onSearch={handleSearch} />
      </div>

      <div className="current-panel">
        {error && <p className="error-message">{error}</p>}
        {loading && <p className="loading-message">Loading...</p>}

        <h2 className="city-title">
          {weatherData.location}
          {weatherData.country ? `, ${weatherData.country}` : ""}
        </h2>

        <p className="date-text">{weatherData.dateTime}</p>
        <p className="section-label">Current Weather</p>

        <div className="current-main">
          <div className="current-left">
            {weatherData.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt="weather icon"
                className="main-weather-icon"
              />
            )}
            <p className="main-temp">{weatherData.temperature}°C</p>
          </div>

          <div className="current-right">
            <p className="condition-text">{weatherData.condition}</p>
            <p className="feels-like">Feels like {weatherData.feelsLike}°C</p>
          </div>
        </div>

        <WeatherDetails
          humidity={weatherData.humidity}
          windSpeed={weatherData.windSpeed}
          pressure={weatherData.pressure}
        />
      </div>

      <div className="forecast-panel">
        <ForecastList forecastData={forecastData} />
      </div>
    </div>
  );
};

export default WeatherCard;
