import { useEffect, useState } from "react";
import { getMeteoPerCitta } from "../api/meteo";
import MeteoCard from "./MeteoCard";
import "./Home.css";

// Le due città mostrate in home. Cambia CITTA_PREFERITA con la tua.
const CITTA_FISSA = "Roma";
const CITTA_PREFERITA = "Milano";

// Mappa meteo interattiva dell'Italia (Windy, embed pubblico senza chiave API)
const MAPPA_URL =
  "https://embed.windy.com/embed2.html?lat=42.5&lon=12.5&zoom=5&overlay=temp&menu=&message=&marker=&type=map";

function Home() {
  const [citta, setCitta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const caricaCitta = async () => {
      try {
        // Le due chiamate partono insieme: nessuna aspetta l'altra
        const risultati = await Promise.all([
          getMeteoPerCitta(CITTA_FISSA),
          getMeteoPerCitta(CITTA_PREFERITA),
        ]);
        setCitta(risultati);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    caricaCitta();
  }, []);

  return (
    <div className="home">
      <h1 className="home__titolo">Meteo Italia</h1>

      {loading && <p>Caricamento dati meteo...</p>}
      {error && <p className="home__error">Si è verificato un errore: {error}</p>}

      <div className="home__cards">
        {citta.map((item) => (
          <MeteoCard key={item.luogo.id} luogo={item.luogo} meteo={item.meteo} />
        ))}
      </div>

      <iframe
        className="home__mappa"
        src={MAPPA_URL}
        title="Mappa meteo dell'Italia"
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Home;
