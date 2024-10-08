import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <span style={{ color: "red" }}>UNICOMP</span> Felvételi feladat
      </div>
      <div className="navbar">
        <Link to={"/register"} className="navlink">
          Regisztráció
        </Link>
        <Link to={"/"} className="navlink">
          Bejelentkezés
        </Link>
        <Link to={"/"} className="navlink" hidden>
          Profilom
        </Link>
        <Link to={"/books"} className="navlink">
          Könyvek
        </Link>
        <Link to={"/"} className="navlink">
          Könyv hozzáadása
        </Link>
      </div>
    </div>
  );
};

export default Header;
