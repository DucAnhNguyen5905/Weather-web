import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const WeatherDetails = ({ humidity, windSpeed }) => {
  return (
    <div className="weather-data">
      <div className="col">
        <img src={humidity_icon} alt="humidity icon" />
        <div>
          <p>{humidity}%</p>
          <span>Humidity</span>
        </div>
      </div>

      <div className="col">
        <img src={wind_icon} alt="wind icon" />
        <div>
          <p>{windSpeed} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
