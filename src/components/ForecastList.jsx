const ForecastList = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <>
      <h2 className="forecast-heading">3-Day Forecast</h2>

      <div className="forecast-grid">
        {forecastData.map((item) => (
          <div className="forecast-item" key={item.dt}>
            <p className="forecast-time">
              {new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="forecast-item-icon"
            />

            <p className="forecast-item-temp">{Math.round(item.main.temp)}°C</p>
            <p className="forecast-item-condition">{item.weather[0].main}</p>
            <p className="forecast-item-wind">{item.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ForecastList;
