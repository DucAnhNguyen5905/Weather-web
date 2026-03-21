const WeatherDetails = ({ humidity, windSpeed, pressure, unit }) => {
  const windUnit = unit === "metric" ? "m/s" : "mph";

  return (
    <div className="weather-details-row">
      <div className="detail-box">
        <p className="detail-label">Wind</p>
        <p className="detail-value">
          {windSpeed} {windUnit}
        </p>
      </div>

      <div className="detail-box">
        <p className="detail-label">Humidity</p>
        <p className="detail-value">{humidity}%</p>
      </div>

      <div className="detail-box">
        <p className="detail-label">Pressure</p>
        <p className="detail-value">{pressure} hPa</p>
      </div>
    </div>
  );
};

export default WeatherDetails;
