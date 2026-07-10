import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "./Login.css";

function Login() {
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const riuscito = login(nome, password);
    if (!riuscito) {
      setErrore("Nome utente o password non corretti");
      return;
    }
    navigate("/profilo");
  };

  return (
    <div className="login">
      <form className="login__card" onSubmit={handleSubmit}>
        <h1 className="login__titolo">Accedi</h1>

        <label className="login__campo">
          Nome utente
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label className="login__campo">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {errore && <p className="login__errore">{errore}</p>}

        <button type="submit" className="login__button">
          <i className="bi bi-box-arrow-in-right" aria-hidden="true"></i>
          Accedi
        </button>
      </form>
    </div>
  );
}

export default Login;
