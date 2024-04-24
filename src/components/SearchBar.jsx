const SearchBar = ({ searchTerm, setSearchTerm, handleSearchButtonClick }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        name="search"
        value={searchTerm}
        placeholder="A proximité, adresse, arrondissement"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <span>
        <button onClick={handleSearchButtonClick}>RECHERCHE</button>
      </span>
    </div>
  );
};

export default SearchBar;
