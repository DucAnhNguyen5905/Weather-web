const ForecastList = ({ forecastData, unit }) => {
  if (!forecastData || forecastData.length === 0) return null;

  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  return (
    <>
      <h2 className="forecast-heading">Forecast</h2>

      <div className="forecast-grid">
        {forecastData.map((item) => {
          const dateObj = new Date(item.date);

          return (
            <div className="forecast-item" key={item.dt}>
              <p className="forecast-day">
                {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
              </p>

              <p className="forecast-date">
                {dateObj.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt={item.condition}
                className="forecast-item-icon"
              />

              <p className="forecast-item-condition">{item.condition}</p>

              <div className="forecast-temp-row">
                <span className="forecast-temp-max">
                  {item.maxTemp}
                  {tempUnit}
                </span>
                <span className="forecast-temp-min">
                  {item.minTemp}
                  {tempUnit}
                </span>
              </div>

              <p className="forecast-item-wind">
                Wind: {item.windSpeed} {windUnit}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ForecastList;
