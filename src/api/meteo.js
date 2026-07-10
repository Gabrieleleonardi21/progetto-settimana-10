// Helper centralizzato per le chiamate a Open-Meteo.
// Tutti i componenti passano da qui: se l'API cambia, si tocca solo questo file.

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const METEO_URL = "https://api.open-meteo.com/v1/forecast";

// Nome città -> array di luoghi trovati (latitude, longitude, name, country)
export async function cercaCitta(nome, quanti = 5) {
  const url = `${GEO_URL}?name=${encodeURIComponent(nome)}&count=${quanti}&language=it&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Errore nel geocoding della città");

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`Nessuna città trovata per "${nome}"`);
  }
  return data.results;
}

// Coordinate -> meteo attuale (temperature, windspeed, winddirection)
export async function getMeteoAttuale(latitude, longitude) {
  const url = `${METEO_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Errore nel recupero dei dati meteo");

  const data = await res.json();
  return data.current_weather;
}

// Scorciatoia usata da Home e Details: nome città -> luogo + meteo insieme
export async function getMeteoPerCitta(nome) {
  const [luogo] = await cercaCitta(nome, 1);
  const meteo = await getMeteoAttuale(luogo.latitude, luogo.longitude);
  return { luogo, meteo };
}
