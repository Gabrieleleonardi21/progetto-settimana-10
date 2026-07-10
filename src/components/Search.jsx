import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cercaCitta, getMeteoAttuale } from "../api/meteo";
import { useAuth } from "../context/auth";
import { useCitta } from "../context/citta";
import MeteoCard from "./MeteoCard";
import SearchBar from "./SearchBar";
import "./Search.css";

// Pagina dei risultati. La query arriva dall'URL (/search?q=roma), non da uno state:
// così il link è condivisibile e il tasto "indietro" del browser funziona.
function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { utente } = useAuth();
  const { aggiungi } = useCitta();

  const [risultati, setRisultati] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // { id, testo, cardId } oppure null. cardId dice sopra quale card mostrarlo,
  // id cambia a ogni click e fa ripartire il timer anche se il testo è lo stesso.
  const [toast, setToast] = useState(null);

  // Riferimento stabile tra i render, altrimenti l'effect del Toast
  // ricreerebbe il timer a ogni render di Search e la notifica resterebbe appesa.
  const chiudiToast = useCallback(() => setToast(null), []);

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
      <div className="search__barra">
        <SearchBar />
      </div>

      {!query && <p>Scrivi il nome di una città e premi Cerca.</p>}
      {query && <h1 className="search__titolo">Risultati per "{query}"</h1>}

      {loading && <p>Caricamento dati meteo...</p>}
      {error && (
        <p className="search__error">Si è verificato un errore: {error}</p>
      )}

      <div className="search__cards">
        {risultati.map((item) => {
          // Senza login azione resta null e MeteoCard non disegna il bottone
          const azione = utente && {
            icona: "bi-plus-lg",
            etichetta: `Aggiungi ${item.luogo.name} alla home`,
            onClick: () => {
              aggiungi(item.luogo.name);
              setToast({
                id: Date.now(),
                testo: "Aggiunto ai preferiti",
                cardId: item.luogo.id,
              });
            },
          };

          // Il toast vive dentro la card: solo quella cliccata lo riceve
          const toastCard = toast?.cardId === item.luogo.id && toast;

          return (
            <MeteoCard
              key={item.luogo.id}
              luogo={item.luogo}
              meteo={item.meteo}
              azione={azione}
              toast={toastCard}
              onToastChiudi={chiudiToast}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Search;
