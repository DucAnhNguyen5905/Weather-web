import { useState } from "react";
import { getCurrentWeather } from "../api/weatherApi";

function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);

  try {
    setError("");

    const currentRes = getCurrentWeather(city.trim());
    const forecastRes = getForecast(city.trim());

    setWeather(currentRes.data);
    setForecast(forecastRes.data.list);
  } catch (err) {
    setError("City not found!");
    setWeather(null);
    setForecast([]);
  }
}
const dailyForecast = forecast
  .filter((item) => item.dt_txt.includes("12:00:00"))
  .slice(0, 3);

return (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>Weather App</h1>

    <input
      type="text"
      placeholder="Enter city..."
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />

    <SearchBar onSearch={setCity} />

    {error && <p style={{ color: "red" }}>{error}</p>}

    {weather && (
      <div>
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp} °C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <p>Condition: {weather.weather[0].description}</p>
      </div>
    )}

    {dailyForecast.length > 0 && (
      <div style={{ marginTop: "30px" }}>
        <h2>3-Day Forecast</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {dailyForecast.map((item) => (
            <div
              key={item.dt}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                width: "180px",
              }}
            >
              <h3>{new Date(item.dt_txt).toLocaleDateString()}</h3>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />

              <p>Temp: {item.main.temp} °C</p>
              <p>{item.weather[0].description}</p>
              <p>Humidity: {item.main.humidity}%</p>
              <p>Wind: {item.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default Home;
