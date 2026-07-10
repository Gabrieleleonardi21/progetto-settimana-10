import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

// Barra di ricerca riutilizzabile: non cerca da sola, porta l'utente su /search?q=...
// La pagina Search legge il parametro e fa la chiamata. Così la ricerca è condivisibile via URL.
// Vive dentro la pagina Search: uscendo dalla route si smonta e l'input si svuota da solo.
function SearchBar() {
  const [citta, setCitta] = useState("");
  const navigate = useNavigate();

  // Il form gestisce nativamente il tasto Invio, senza onKeyDown
  const handleSubmit = (e) => {
    e.preventDefault();
    const nome = citta.trim();
    if (!nome) return;
    navigate(`/search?q=${encodeURIComponent(nome)}`);
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchbar__input"
        value={citta}
        onChange={(e) => setCitta(e.target.value)}
        placeholder="Cerca una città..."
      />
      <button type="submit" className="searchbar__button">
        Cerca
      </button>
    </form>
  );
}

export default SearchBar;
