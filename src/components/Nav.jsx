import { NavLink } from "react-router-dom";
import "./Nav.css";

// Barra di navigazione sempre visibile: solo logo e link.
// La ricerca vive dentro la pagina /search, non qui.
// NavLink aggiunge da solo la classe "active" al link della pagina corrente.
function Nav() {
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
    </nav>
  );
}

export default Nav;
