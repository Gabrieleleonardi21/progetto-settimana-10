import { Link } from "react-router-dom";
import "./MeteoCard.css";

// Card riassuntiva di una città. È un Link: cliccandola si apre la route /details.
// Componente di sola presentazione: riceve i dati via props, non fa fetch.
function MeteoCard({ luogo, meteo }) {
  return (
    <Link className="card" to={`/details/${encodeURIComponent(luogo.name)}`}>
      <h3 className="card__titolo">
        {luogo.name}
        {luogo.country && `, ${luogo.country}`}
      </h3>
      <p className="card__temp">{meteo.temperature}°C</p>
      <p className="card__vento">Vento {meteo.windspeed} km/h</p>
    </Link>
  );
}

export default MeteoCard;
