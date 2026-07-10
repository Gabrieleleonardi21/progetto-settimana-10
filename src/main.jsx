import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Icone disponibili ovunque come <i className="bi bi-nome-icona" />
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App.jsx";

// BrowserRouter avvolge tutta l'app: senza, le route di App non funzionano
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
