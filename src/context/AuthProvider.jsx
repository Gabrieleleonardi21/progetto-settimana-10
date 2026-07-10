import { useState } from "react";
import { AuthContext } from "./auth";

// ATTENZIONE: credenziali scritte nel sorgente. Finiscono nel bundle JavaScript e
// chiunque apra gli strumenti del browser può leggerle. Va bene solo per un esercizio:
// un login vero verifica le credenziali su un server, mai nel browser.
const CREDENZIALI = { utente: "gabriele", password: "meteo2026" };

const CHIAVE = "meteoapp:utente";

export function AuthProvider({ children }) {
  // Lo stato parte da localStorage: così l'accesso sopravvive al ricaricamento.
  // Salviamo solo il nome, mai la password.
  const [utente, setUtente] = useState(() => localStorage.getItem(CHIAVE));

  const login = (nome, password) => {
    if (nome !== CREDENZIALI.utente || password !== CREDENZIALI.password) {
      return false;
    }
    localStorage.setItem(CHIAVE, nome);
    setUtente(nome);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(CHIAVE);
    setUtente(null);
  };

  return (
    <AuthContext.Provider value={{ utente, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
