import { useEffect, useState } from "react";
import { getMeteoPerCitta } from "../api/meteo";
import { useAuth } from "../context/auth";
import { useCitta } from "../context/citta";
import { urlMappaWindy } from "../utils/mappaWindy";
import MeteoCard from "./MeteoCard";
import "./Home.css";

// Vista d'insieme centrata sull'Italia. overlay=waves apre la mappa sulle onde;
// l'utente può poi cambiare livello dal menu di Windy.
const MAPPA_URL = urlMappaWindy({
  lat: 42.5,
  lon: 12.5,
  zoom: 5,
  overlay: "waves",
});

function Home() {
  const { utente } = useAuth();
  const { citta, aggiungi, rimuovi } = useCitta();

  const [risultati, setRisultati] = useState([]);
  const [nuova, setNuova] = useState("");
  const [loading, setLoading] = useState(true);
  const [nonTrovate, setNonTrovate] = useState([]);

  useEffect(() => {
    const caricaCitta = async () => {
      setLoading(true);

      // allSettled e non all: una città inesistente non deve far sparire le altre
      const esiti = await Promise.allSettled(
        citta.map((nome) => getMeteoPerCitta(nome)),
      );

      const trovate = [];
      const mancanti = [];
      esiti.forEach((esito, i) => {
        if (esito.status === "fulfilled") {
          // teniamo il nome richiesto: è la chiave con cui rimuovere dalla lista
          trovate.push({ richiesta: citta[i], ...esito.value });
          return;
        }
        mancanti.push(citta[i]);
      });

      setRisultati(trovate);
      setNonTrovate(mancanti);
      setLoading(false);
    };

    caricaCitta();
  }, [citta]); // si ricarica a ogni aggiunta o rimozione

  const handleAggiungi = (e) => {
    e.preventDefault();
    aggiungi(nuova);
    setNuova("");
  };

  return (
    <div className="home">
      <h1 className="home__titolo">Meteo Italia</h1>

      {/* Il form compare solo agli utenti autenticati */}
      {utente && (
        <form className="home__aggiungi" onSubmit={handleAggiungi}>
          <input
            type="text"
            className="home__input"
            value={nuova}
            onChange={(e) => setNuova(e.target.value)}
            placeholder="Aggiungi una città..."
            aria-label="Nome della città da aggiungere"
          />
          <button type="submit" className="home__button">
            <i className="bi bi-plus-lg" aria-hidden="true"></i>
            Aggiungi
          </button>
        </form>
      )}

      {loading && <p>Caricamento dati meteo...</p>}
      {nonTrovate.length > 0 && (
        <p className="home__error">
          Nessun dato per: {nonTrovate.join(", ")}
        </p>
      )}

      <div className="home__cards">
        {risultati.map((item) => {
          // Senza login azione resta null e MeteoCard non disegna il bottone
          const azione = utente && {
            icona: "bi-x-lg",
            etichetta: `Rimuovi ${item.luogo.name}`,
            onClick: () => rimuovi(item.richiesta),
          };

          return (
            <MeteoCard
              key={item.richiesta}
              luogo={item.luogo}
              meteo={item.meteo}
              azione={azione}
            />
          );
        })}
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
