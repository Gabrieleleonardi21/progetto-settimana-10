import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMeteoPerCitta } from "../api/meteo";
import "./Details.css";

// Dettaglio di una singola città. Il nome arriva dall'URL: /details/Roma
function Details() {
  const { nome } = useParams();

  const [dati, setDati] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carica = async () => {
      setLoading(true);
      setError(null);
      setDati(null);

      try {
        setDati(await getMeteoPerCitta(nome));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    carica();
  }, [nome]);

  return (
    <div className="details">
      <Link to="/search" className="details__indietro">
        ← Torna alla ricerca
      </Link>

      {loading && <p>Caricamento dati meteo...</p>}
      {error && (
        <p className="details__error">Si è verificato un errore: {error}</p>
      )}

      {dati && (
        <div className="details__card">
          <h1 className="details__titolo">
            {dati.luogo.name}
            {dati.luogo.country && `, ${dati.luogo.country}`}
          </h1>
          <p className="details__temp">{dati.meteo.temperature}°C</p>

          <dl className="details__lista">
            <dt>Velocità del vento</dt>
            <dd>{dati.meteo.windspeed} km/h</dd>

            <dt>Direzione vento</dt>
            <dd>{dati.meteo.winddirection}°</dd>

            <dt>Coordinate</dt>
            <dd>
              {dati.luogo.latitude}, {dati.luogo.longitude}
            </dd>
          </dl>
        </div>
      )}
    </div>
  );
}

export default Details;
