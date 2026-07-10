// Traduce il weathercode di Open-Meteo (standard WMO) in icona Bootstrap + descrizione.
// Elenco completo dei codici: https://open-meteo.com/en/docs
const CONDIZIONI = {
  0: { icona: "bi-sun", testo: "Sereno" },
  1: { icona: "bi-cloud-sun", testo: "Prevalentemente sereno" },
  2: { icona: "bi-cloud-sun", testo: "Parzialmente nuvoloso" },
  3: { icona: "bi-clouds", testo: "Coperto" },

  45: { icona: "bi-cloud-fog", testo: "Nebbia" },
  48: { icona: "bi-cloud-fog", testo: "Nebbia con brina" },

  51: { icona: "bi-cloud-drizzle", testo: "Pioviggine leggera" },
  53: { icona: "bi-cloud-drizzle", testo: "Pioviggine" },
  55: { icona: "bi-cloud-drizzle", testo: "Pioviggine intensa" },
  56: { icona: "bi-cloud-drizzle", testo: "Pioviggine gelata" },
  57: { icona: "bi-cloud-drizzle", testo: "Pioviggine gelata intensa" },

  61: { icona: "bi-cloud-rain", testo: "Pioggia leggera" },
  63: { icona: "bi-cloud-rain", testo: "Pioggia" },
  65: { icona: "bi-cloud-rain-heavy", testo: "Pioggia intensa" },
  66: { icona: "bi-cloud-rain", testo: "Pioggia gelata" },
  67: { icona: "bi-cloud-rain-heavy", testo: "Pioggia gelata intensa" },

  71: { icona: "bi-cloud-snow", testo: "Neve leggera" },
  73: { icona: "bi-cloud-snow", testo: "Neve" },
  75: { icona: "bi-cloud-snow", testo: "Neve intensa" },
  77: { icona: "bi-cloud-snow", testo: "Granelli di neve" },

  80: { icona: "bi-cloud-rain", testo: "Rovesci leggeri" },
  81: { icona: "bi-cloud-rain", testo: "Rovesci" },
  82: { icona: "bi-cloud-rain-heavy", testo: "Rovesci violenti" },
  85: { icona: "bi-cloud-snow", testo: "Rovesci di neve" },
  86: { icona: "bi-cloud-snow", testo: "Rovesci di neve intensi" },

  95: { icona: "bi-cloud-lightning-rain", testo: "Temporale" },
  96: { icona: "bi-cloud-lightning-rain", testo: "Temporale con grandine" },
  99: { icona: "bi-cloud-lightning-rain", testo: "Temporale con grandine forte" },
};

const SCONOSCIUTA = {
  icona: "bi-question-circle",
  testo: "Condizioni non disponibili",
};

// Un codice fuori tabella non deve rompere la card: torna un'icona neutra
export function condizioneMeteo(codice) {
  return CONDIZIONI[codice] || SCONOSCIUTA;
}
