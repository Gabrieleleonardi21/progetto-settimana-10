import { Link, useLocation } from "react-router-dom";
import { condizioneMeteo } from "../utils/condizioneMeteo";
import "./MeteoCard.css";

// Card riassuntiva di una città. È un Link: cliccandola si apre la route /details.
// Componente di sola presentazione: riceve i dati via props, non fa fetch.
function MeteoCard({ luogo, meteo }) {
  const { pathname, search } = useLocation();

  // Registriamo la pagina di partenza (con la query, per non perdere i risultati):
  // Details la legge per capire dove riportare l'utente col link "indietro".
  const provenienza = pathname + search;

  const condizione = condizioneMeteo(meteo.weathercode);

  return (
    <Link
      className="card"
      to={`/details/${encodeURIComponent(luogo.name)}`}
      state={{ da: provenienza }}
    >
      <h3 className="card__titolo">
        {luogo.name}
        {luogo.country && `, ${luogo.country}`}
      </h3>
      <p className="card__temp">
        {/* L'icona porta un'informazione che il testo non ha: va descritta, non nascosta */}
        <i
          className={`bi ${condizione.icona}`}
          role="img"
          aria-label={condizione.testo}
          title={condizione.testo}
        ></i>
        {meteo.temperature}°C
      </p>
      <p className="card__vento">
        <i className="bi bi-wind" aria-hidden="true"></i>
        Vento {meteo.windspeed} km/h
      </p>
    </Link>
  );
}

export default MeteoCard;
