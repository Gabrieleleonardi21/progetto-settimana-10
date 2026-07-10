import { useEffect } from "react";
import "./Toast.css";

// Notifica temporanea che si chiude da sola dopo `durata` ms.
// Componente di sola presentazione: chi lo usa tiene lo state e passa onChiudi.
// role="status" + aria-live: gli screen reader leggono il messaggio senza rubare il focus.
function Toast({ messaggio, onChiudi, durata = 2500 }) {
  useEffect(() => {
    const timer = setTimeout(onChiudi, durata);
    // Il timer va annullato se il toast sparisce prima: niente setState a componente smontato
    return () => clearTimeout(timer);
  }, [onChiudi, durata]);

  return (
    <div className="toast" role="status" aria-live="polite">
      <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
      {messaggio}
    </div>
  );
}

export default Toast;
