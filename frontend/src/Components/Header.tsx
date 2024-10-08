import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <span style={{ color: "red" }}>UNICOMP</span> Felvételi feladat
      </div>
      <div className="navbar">
        <Link to={"/register"} className="navlink">
          Register
        </Link>
        <Link to={"/"} className="navlink">
          Login
        </Link>
        <Link to={"/"} className="navlink" hidden>
          Me
        </Link>
        <Link to={"/books"} className="navlink">
          Books
        </Link>
        <Link to={"/"} className="navlink">
          Create Book
        </Link>
      </div>
    </div>
  );
};

export default Header;
