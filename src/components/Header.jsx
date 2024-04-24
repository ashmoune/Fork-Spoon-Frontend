import Logo from "../assets/fork.png";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = ({ searchTerm, setSearchTerm, handleSearchButtonClick }) => {
  const location = useLocation();
  return (
    <>
      <div className="fork-logo">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>

      <div>
        {location.pathname.includes("/restaurants/") && (
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchButtonClick={handleSearchButtonClick}
          />
        )}
      </div>
    </>
  );
};

export default Header;
