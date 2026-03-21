import { useState } from "react";

const SearchBar = ({
  inputRef,
  onSearch,
  suggestions,
  onSelectSuggestion,
  onInputChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const showSuggestions = isFocused && suggestions && suggestions.length > 0;

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
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 150);
          }}
        />
        <button className="search-button" onClick={onSearch}>
          Search
        </button>
      </div>

      {showSuggestions && (
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
