import { Link, useLocation } from "react-router-dom";
import { condizioneMeteo } from "../utils/condizioneMeteo";
import Toast from "./Toast";
import "./MeteoCard.css";

// Card riassuntiva di una città. È un Link: cliccandola si apre la route /details.
// Componente di sola presentazione: riceve i dati via props, non fa fetch.
//
// azione (opzionale): { icona, etichetta, onClick, variante } disegna un bottone in alto
// a destra. Home lo usa per rimuovere, Search per aggiungere. Sta FUORI dal Link: un
// <button> dentro un <a> è HTML non valido e il click farebbe comunque navigare.
//
// toast (opzionale): { id, testo } mostra la notifica sopra QUESTA card.
// La key sull'id fa ripartire il timer anche se il testo non cambia.
function MeteoCard({ luogo, meteo, azione, toast, onToastChiudi }) {
  const { pathname, search } = useLocation();

  // Registriamo la pagina di partenza (con la query, per non perdere i risultati):
  // Details la legge per capire dove riportare l'utente col link "indietro".
  const provenienza = pathname + search;

  const condizione = condizioneMeteo(meteo.weathercode);

  // variante "pericolo" -> classe card__azione--pericolo.
  // filter(Boolean) scarta la modificatrice quando l'azione manca o non ha variante.
  const classiAzione = [
    "card__azione",
    azione?.variante && `card__azione--${azione.variante}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="card-box">
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

      {azione && (
        <button
          type="button"
          className={classiAzione}
          onClick={azione.onClick}
          aria-label={azione.etichetta}
          title={azione.etichetta}
        >
          <i className={`bi ${azione.icona}`} aria-hidden="true"></i>
        </button>
      )}

      {toast && (
        <Toast key={toast.id} messaggio={toast.testo} onChiudi={onToastChiudi} />
      )}
    </div>
  );
}

export default MeteoCard;
