const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className="search-icon">🔎</span>
      <input
        className="search-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Hanoi"
        required
      />
    </form>
  );
};
export default SearchBar;
