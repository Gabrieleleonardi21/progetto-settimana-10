import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getMeteoPerCitta } from "../api/meteo";
import { urlMappaWindy } from "../utils/mappaWindy";
import "./Details.css";

// Dettaglio di una singola città. Il nome arriva dall'URL: /details/Roma
function Details() {
  const { nome } = useParams();
  const { state } = useLocation();

  // La card ci dice da dove arriva il click. Se manca (link aperto direttamente
  // o pagina ricaricata) il fallback è la home.
  const indietro = state?.da || "/";
  let etichetta = "Torna alla home";
  if (indietro.startsWith("/search")) etichetta = "Torna alla ricerca";

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
      <Link to={indietro} className="details__indietro">
        <i className="bi bi-arrow-left" aria-hidden="true"></i>
        {etichetta}
      </Link>

      {loading && <p>Caricamento dati meteo...</p>}
      {error && (
        <p className="details__error">Si è verificato un errore: {error}</p>
      )}

      {dati && (
        <>
          <div className="details__card">
            <h1 className="details__titolo">
              {dati.luogo.name}
              {dati.luogo.country && `, ${dati.luogo.country}`}
            </h1>
            <p className="details__temp">{dati.meteo.temperature}°C</p>

            <dl className="details__lista">
              <dt>
                <i className="bi bi-wind" aria-hidden="true"></i>
                Velocità del vento
              </dt>
              <dd>{dati.meteo.windspeed} km/h</dd>

              <dt>
                <i className="bi bi-compass" aria-hidden="true"></i>
                Direzione vento
              </dt>
              <dd>{dati.meteo.winddirection}°</dd>

              <dt>
                <i className="bi bi-geo-alt" aria-hidden="true"></i>
                Coordinate
              </dt>
              <dd>
                {dati.luogo.latitude}, {dati.luogo.longitude}
              </dd>
            </dl>
          </div>

          {/* Mappa centrata sulla città, con il marker sulle sue coordinate */}
          <iframe
            className="details__mappa"
            src={urlMappaWindy({
              lat: dati.luogo.latitude,
              lon: dati.luogo.longitude,
              zoom: 9,
              overlay: "temp",
              marker: true,
            })}
            title={`Mappa meteo di ${dati.luogo.name}`}
            loading="lazy"
          ></iframe>
        </>
      )}
    </div>
  );
}

export default Details;
