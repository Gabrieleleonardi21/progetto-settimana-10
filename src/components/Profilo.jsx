import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import "./Profilo.css";

function Profilo() {
  const { utente, logout } = useAuth();

  // Chi non ha fatto l'accesso vede un invito, non i dati di qualcun altro
  if (!utente) {
    return (
      <div className="profilo">
        <div className="profilo__card">
          <i className="bi bi-person-circle profilo__avatar" aria-hidden="true"></i>
          <p className="profilo__ruolo">Non hai effettuato l'accesso.</p>
          <Link to="/login" className="profilo__link">
            Vai al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profilo">
      <div className="profilo__card">
        <i className="bi bi-person-circle profilo__avatar" aria-hidden="true"></i>
        <h1 className="profilo__nome">{utente}</h1>
        <p className="profilo__ruolo">Utente di MeteoApp</p>

        <button type="button" className="profilo__logout" onClick={logout}>
          <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
          Esci
        </button>
      </div>
    </div>
  );
}

export default Profilo;
