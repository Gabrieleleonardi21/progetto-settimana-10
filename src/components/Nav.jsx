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
        <NavLink to="/" className="nav__link">
          Home
        </NavLink>
        <NavLink to="/search" className="nav__link">
          Cerca
        </NavLink>
      </div>

      {/* Solo icona: senza aria-label il link sarebbe muto per i lettori di schermo */}
      <NavLink
        to="/profilo"
        className="nav__utente"
        aria-label="Profilo utente"
      >
        <i className="bi bi-person-circle" aria-hidden="true"></i>
      </NavLink>
    </nav>
  );
}

export default Nav;
