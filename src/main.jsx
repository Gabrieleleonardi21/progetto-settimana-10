import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Icone disponibili ovunque come <i className="bi bi-nome-icona" />
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { CittaProvider } from "./context/CittaProvider.jsx";

// BrowserRouter avvolge tutta l'app: senza, le route di App non funzionano.
// I due provider rendono utente e lista città leggibili da qualsiasi componente.
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CittaProvider>
        <App />
      </CittaProvider>
    </AuthProvider>
  </BrowserRouter>,
);
