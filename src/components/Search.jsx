import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cercaCitta, getMeteoAttuale } from "../api/meteo";
import MeteoCard from "./MeteoCard";
import "./Search.css";

// Pagina dei risultati. La query arriva dall'URL (/search?q=roma), non da uno state:
// così il link è condivisibile e il tasto "indietro" del browser funziona.
function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [risultati, setRisultati] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const cerca = async () => {
      setLoading(true);
      setError(null);
      setRisultati([]);

      try {
        const luoghi = await cercaCitta(query);
        // Per ogni città trovata scarichiamo il meteo, tutte in parallelo
        const conMeteo = await Promise.all(
          luoghi.map(async (luogo) => {
            const meteo = await getMeteoAttuale(luogo.latitude, luogo.longitude);
            return { luogo, meteo };
          }),
        );
        setRisultati(conMeteo);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cerca();
  }, [query]); // si rilancia ogni volta che cambia la query nell'URL

  return (
    <div className="search">
      {!query && <p>Scrivi il nome di una città nella barra in alto.</p>}
      {query && <h1 className="search__titolo">Risultati per "{query}"</h1>}

      {loading && <p>Caricamento dati meteo...</p>}
      {error && (
        <p className="search__error">Si è verificato un errore: {error}</p>
      )}

      <div className="search__cards">
        {risultati.map((item) => (
          <MeteoCard
            key={item.luogo.id}
            luogo={item.luogo}
            meteo={item.meteo}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
