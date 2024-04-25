import Logo from "../assets/fork.png";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = ({ searchTerm, setSearchTerm, handleSearchButtonClick }) => {
  const location = useLocation();
  return (
    <>
      <div className="header container">
        <div className="fork-logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        {location.pathname.includes("/restaurants/") && (
          <div className="search-bar-header">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearchButtonClick={handleSearchButtonClick}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
