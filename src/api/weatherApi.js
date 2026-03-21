const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
};

export const getForecast = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("Forecast not found");
  }

  return response.json();
};
