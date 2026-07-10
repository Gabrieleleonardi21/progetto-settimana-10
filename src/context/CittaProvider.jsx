import { useEffect, useState } from "react";
import { CittaContext } from "./citta";

const CHIAVE = "meteoapp:citta";
const INIZIALI = ["Roma", "Londra"];

// Legge la lista salvata. Se manca o è corrotta, riparte dalle città iniziali.
function leggiSalvate() {
  try {
    const grezzo = localStorage.getItem(CHIAVE);
    if (!grezzo) return INIZIALI;
    const lista = JSON.parse(grezzo);
    if (!Array.isArray(lista)) return INIZIALI;
    return lista;
  } catch {
    return INIZIALI;
  }
}

export function CittaProvider({ children }) {
  const [citta, setCitta] = useState(leggiSalvate);

  // Ogni modifica alla lista viene salvata. localStorage non è state: niente loop.
  useEffect(() => {
    localStorage.setItem(CHIAVE, JSON.stringify(citta));
  }, [citta]);

  const aggiungi = (nome) => {
    const pulito = nome.trim();
    if (!pulito) return;
    // Confronto senza maiuscole: "roma" e "Roma" sono la stessa città
    const esiste = citta.some((c) => c.toLowerCase() === pulito.toLowerCase());
    if (esiste) return;
    setCitta([...citta, pulito]);
  };

  const rimuovi = (nome) => {
    setCitta(citta.filter((c) => c !== nome));
  };

  return (
    <CittaContext.Provider value={{ citta, aggiungi, rimuovi }}>
      {children}
    </CittaContext.Provider>
  );
}
