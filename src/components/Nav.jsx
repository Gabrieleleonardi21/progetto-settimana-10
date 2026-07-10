import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Nav.css";

// Barra di navigazione sempre visibile: link alle route + barra di ricerca.
// NavLink aggiunge da solo la classe "active" al link della pagina corrente.
function Nav() {
  const { pathname } = useLocation();

  // Sulla pagina di ricerca la barra si allarga: la ricerca è il contenuto principale
  const classiSearch = ["nav__search"];
  if (pathname === "/search") classiSearch.push("nav__search--wide");

  return (
    <nav className="nav">
      <NavLink to="/" className="nav__brand">
        MeteoApp
      </NavLink>

      <div className="nav__links">
        <NavLink to="/home" className="nav__link">
          Home
        </NavLink>
        <NavLink to="/search" className="nav__link">
          Cerca
        </NavLink>
      </div>

      <div className={classiSearch.join(" ")}>
        <SearchBar />
      </div>
    </nav>
  );
}

export default Nav;
