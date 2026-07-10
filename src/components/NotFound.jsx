import { Link } from "react-router-dom";
import "./NotFound.css";

// Mostrato quando l'URL non combacia con nessuna route (path="*" in App.jsx)
function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound__codice">404</p>
      <h1 className="notfound__titolo">Pagina non trovata</h1>
      <p>L'indirizzo che hai aperto non esiste.</p>
      <Link to="/" className="notfound__link">
        ← Torna alla home
      </Link>
    </div>
  );
}

export default NotFound;
