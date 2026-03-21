const SearchBar = ({ inputRef, onSearch }) => {
  return (
    <div className="search-row">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter city name..."
        className="search-input"
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <button className="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
