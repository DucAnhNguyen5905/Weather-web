const UnitToggle = ({ unit, onChangeUnit }) => {
  return (
    <div className="unit-toggle">
      <button
        className={unit === "metric" ? "unit-btn active" : "unit-btn"}
        onClick={() => onChangeUnit("metric")}
      >
        °C
      </button>

      <button
        className={unit === "imperial" ? "unit-btn active" : "unit-btn"}
        onClick={() => onChangeUnit("imperial")}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
