import "./Profilo.css";

// Dati dell'utente. Statici: l'app non ha autenticazione.
const UTENTE = { nome: "Gabriele" };

function Profilo() {
  return (
    <div className="profilo">
      <div className="profilo__card">
        <i className="bi bi-person-circle profilo__avatar" aria-hidden="true"></i>
        <h1 className="profilo__nome">{UTENTE.nome}</h1>
        <p className="profilo__ruolo">Utente di MeteoApp</p>
      </div>
    </div>
  );
}

export default Profilo;
