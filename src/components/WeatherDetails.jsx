const WeatherDetails = ({ humidity, windSpeed, pressure }) => {
  return (
    <div className="weather-details-row">
      <div className="detail-box">
        <p className="detail-label">Wind</p>
        <p className="detail-value">{windSpeed} m/s</p>
      </div>

      <div className="detail-box">
        <p className="detail-label">Humidity</p>
        <p className="detail-value">{humidity}%</p>
      </div>

      <div className="detail-box">
        <p className="detail-label">Pressure</p>
        <p className="detail-value">{pressure} mb</p>
      </div>
    </div>
  );
};

export default WeatherDetails;
