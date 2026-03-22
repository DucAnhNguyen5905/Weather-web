const LocationButton = ({ onUseLocation }) => {
  return (
    <button className="location-button" onClick={onUseLocation}>
      Use My Location
    </button>
  );
};

export default LocationButton;
