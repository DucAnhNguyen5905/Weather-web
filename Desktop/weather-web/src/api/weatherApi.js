const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

export const searchLocations = async (city) => {
  const response = await fetch(
    `${GEO_BASE_URL}/direct?q=${encodeURIComponent(city)}&limit=5&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Location search failed");
  }

  return response.json();
};

export const getCurrentWeatherByCoords = async (lat, lon, unit = "metric") => {
  const response = await fetch(
    `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`,
  );

  if (!response.ok) {
    throw new Error("Current weather not found");
  }

  return response.json();
};

export const getForecastByCoords = async (lat, lon, unit = "metric") => {
  const response = await fetch(
    `${WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`,
  );

  if (!response.ok) {
    throw new Error("Forecast not found");
  }

  return response.json();
};
