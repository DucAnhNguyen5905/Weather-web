import axios from "axios";
// OpenWeatherMap

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// get API key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// get weather data by city's name

export const getCurrentWeather = (city) => {
  return axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });
};

// get weather forecast
export const getForecast = (city) => {
  return axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });
};

//console.log("API KEY:", API_KEY);
