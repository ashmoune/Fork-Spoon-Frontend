import Logo from "../assets/fork.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="fork-logo">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
    </>
  );
};

export default Header;
