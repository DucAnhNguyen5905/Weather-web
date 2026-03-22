import { useEffect, useRef, useState } from "react";
import "./Weather.css";

import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherDetails";
import ForecastList from "./ForecastList";
import ForecastChart from "./ForecastChart";
import UnitToggle from "./UnitToggle";

import CityMap from "./CityMap";
import {
  searchLocations,
  getCurrentWeatherByCoords,
  getForecastByCoords,
} from "../api/weatherApi";

const WeatherCard = ({ setBackgroundClass }) => {
  const inputRef = useRef(null);

  const [unit, setUnit] = useState("metric");
  const [lastSearchedCity, setLastSearchedCity] = useState("London");
  const [lastSelectedLocation, setLastSelectedLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [mapLocation, setMapLocation] = useState({
    lat: null,
    lon: null,
  });

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

  const getBackgroundClass = (condition, iconCode) => {
    const isNight = iconCode.endsWith("n");

    if (condition === "Clear") {
      return isNight ? "bg-clear-night" : "bg-clear-day";
    }

    if (condition === "Clouds") {
      return isNight ? "bg-clouds-night" : "bg-clouds-day";
    }

    if (
      condition === "Rain" ||
      condition === "Drizzle" ||
      condition === "Thunderstorm"
    ) {
      return isNight ? "bg-rain-night" : "bg-rain-day";
    }

    if (condition === "Snow") {
      return isNight ? "bg-snow-night" : "bg-snow-day";
    }

    if (condition === "Mist" || condition === "Fog" || condition === "Haze") {
      return isNight ? "bg-mist-night" : "bg-mist-day";
    }

    return isNight ? "bg-default-night" : "bg-default";
  };

  const buildForecastData = (forecastResponse) => {
    const groupedByDate = {};

    forecastResponse.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];

      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }

      groupedByDate[date].push(item);
    });

    return Object.entries(groupedByDate)
      .map(([date, items]) => {
        const temperatures = items.map((item) => item.main.temp);

        const representativeItem = items.reduce((closest, current) => {
          const currentHour = Number(
            current.dt_txt.split(" ")[1].split(":")[0],
          );
          const closestHour = Number(
            closest.dt_txt.split(" ")[1].split(":")[0],
          );

          return Math.abs(currentHour - 12) < Math.abs(closestHour - 12)
            ? current
            : closest;
        });

        return {
          date,
          minTemp: Math.round(Math.min(...temperatures)),
          maxTemp: Math.round(Math.max(...temperatures)),
          icon: representativeItem.weather[0].icon,
          condition: representativeItem.weather[0].description,
          windSpeed: representativeItem.wind.speed,
          dt: representativeItem.dt,
        };
      })
      .slice(0, 5);
  };

  const fetchWeatherByLocation = async (locationObj, selectedUnit = unit) => {
    const { lat, lon, name, country } = locationObj;

    const currentData = await getCurrentWeatherByCoords(lat, lon, selectedUnit);
    const forecastResponse = await getForecastByCoords(lat, lon, selectedUnit);

    const weatherCondition = currentData.weather[0].main;
    const weatherIcon = currentData.weather[0].icon;
    setBackgroundClass(getBackgroundClass(weatherCondition, weatherIcon));

    const localDate = new Date(currentData.dt * 1000).toLocaleString("en-US", {
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
      location: name || currentData.name,
      country: country || currentData.sys.country,
      condition: currentData.weather[0].description,
      feelsLike: Math.round(currentData.main.feels_like),
      pressure: currentData.main.pressure,
      icon: currentData.weather[0].icon,
      dateTime: localDate,
    });

    setForecastData(buildForecastData(forecastResponse));
    setMapLocation({ lat, lon });
    setLastSearchedCity(name || currentData.name);
    setLastSelectedLocation(locationObj);
  };

  const search = async (city, selectedUnit = unit, locationObj = null) => {
    try {
      setError("");
      setLoading(true);

      if (locationObj) {
        await fetchWeatherByLocation(locationObj, selectedUnit);
      } else {
        const locations = await searchLocations(city);

        if (!locations.length) {
          throw new Error("City not found");
        }

        const selectedLocation = locations[0];
        await fetchWeatherByLocation(selectedLocation, selectedUnit);
      }

      setSuggestions([]);
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
      setMapLocation({ lat: null, lon: null });
      setBackgroundClass("bg-default");
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

    setError("");
    search(city, unit);
  };

  const handleChangeUnit = (newUnit) => {
    if (newUnit === unit) return;

    setUnit(newUnit);

    if (lastSelectedLocation) {
      search(lastSearchedCity, newUnit, lastSelectedLocation);
    } else {
      search(lastSearchedCity, newUnit);
    }
  };

  const handleInputChange = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const locations = await searchLocations(value.trim());
      setSuggestions(locations.slice(0, 5));
    } catch {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item) => {
    if (inputRef.current) {
      const label = `${item.name}${item.state ? `, ${item.state}` : ""}, ${item.country}`;
      inputRef.current.value = label;
    }

    setSuggestions([]);
    search(item.name, unit, item);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setError("");
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const currentData = await getCurrentWeatherByCoords(
            latitude,
            longitude,
            unit,
          );
          const forecastResponse = await getForecastByCoords(
            latitude,
            longitude,
            unit,
          );

          const weatherCondition = currentData.weather[0].main;
          const weatherIcon = currentData.weather[0].icon;
          setBackgroundClass(getBackgroundClass(weatherCondition, weatherIcon));

          const localDate = new Date(currentData.dt * 1000).toLocaleString(
            "en-US",
            {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            },
          );

          setWeatherData({
            humidity: currentData.main.humidity,
            windSpeed: currentData.wind.speed,
            temperature: Math.round(currentData.main.temp),
            location: currentData.name,
            country: currentData.sys.country,
            condition: currentData.weather[0].description,
            feelsLike: Math.round(currentData.main.feels_like),
            pressure: currentData.main.pressure,
            icon: currentData.weather[0].icon,
            dateTime: localDate,
          });

          setForecastData(buildForecastData(forecastResponse));
          setMapLocation({ lat: latitude, lon: longitude });

          const realLocationObj = {
            lat: latitude,
            lon: longitude,
            name: currentData.name,
            country: currentData.sys.country,
          };

          setLastSelectedLocation(realLocationObj);
          setLastSearchedCity(currentData.name);

          if (inputRef.current) {
            inputRef.current.value = `${currentData.name}, ${currentData.sys.country}`;
          }

          setSuggestions([]);
        } catch {
          setError("Unable to fetch weather for your current location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied or unavailable.");
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    search("London", unit);
  }, []);

  const tempUnit = unit === "metric" ? "°C" : "°F";

  return (
    <div className="weather-page">
      <div className="search-panel">
        <div className="search-header">
          <SearchBar
            inputRef={inputRef}
            onSearch={handleSearch}
            onUseLocation={handleUseMyLocation}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            onInputChange={handleInputChange}
          />
          <div className="top-actions">
            <UnitToggle unit={unit} onChangeUnit={handleChangeUnit} />
          </div>
        </div>
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
            <p className="main-temp">
              {weatherData.temperature}
              {tempUnit}
            </p>
          </div>

          <div className="current-right">
            <p className="condition-text">{weatherData.condition}</p>
            <p className="feels-like">
              Feels like {weatherData.feelsLike}
              {tempUnit}
            </p>
          </div>
        </div>

        <WeatherDetails
          humidity={weatherData.humidity}
          windSpeed={weatherData.windSpeed}
          pressure={weatherData.pressure}
          unit={unit}
        />
      </div>

      <div className="forecast-panel">
        <ForecastList forecastData={forecastData} unit={unit} />
      </div>

      <ForecastChart forecastData={forecastData} unit={unit} />

      <CityMap
        lat={mapLocation.lat}
        lon={mapLocation.lon}
        cityName={weatherData.location}
        country={weatherData.country}
      />
    </div>
  );
};

export default WeatherCard;
