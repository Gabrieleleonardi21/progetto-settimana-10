import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Icone disponibili ovunque come <i className="bi bi-nome-icona" />
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { CittaProvider } from "./context/CittaProvider.jsx";

// BrowserRouter avvolge tutta l'app: senza, le route di App non funzionano.
// basename legge la "base" di vite.config.js: in sviluppo vale "/", su GitHub
// Pages "/progetto-settimana-10/". Senza, là le route non verrebbero riconosciute.
// I due provider rendono utente e lista città leggibili da qualsiasi componente.
createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <AuthProvider>
      <CittaProvider>
        <App />
      </CittaProvider>
    </AuthProvider>
  </BrowserRouter>,
);
