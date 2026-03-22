const SearchBar = ({
  inputRef,
  onSearch,
  onUseLocation,
  suggestions,
  onSelectSuggestion,
  onInputChange,
}) => {
  const hasSuggestions = suggestions && suggestions.length > 0;

  return (
    <div className="search-wrapper">
      <div className="search-row">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city name..."
          className="search-input"
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />

        <button className="search-button" onClick={onSearch}>
          Search
        </button>

        <button className="location-button" onClick={onUseLocation}>
          Use My Location
        </button>
      </div>

      {hasSuggestions && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li
              key={`${item.name}-${item.country}-${item.lat}-${item.lon}-${index}`}
              className="suggestion-item"
              onClick={() => onSelectSuggestion(item)}
            >
              <span className="suggestion-name">{item.name}</span>
              <span className="suggestion-meta">
                {item.state ? `${item.state}, ` : ""}
                {item.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
