// Costruisce l'URL della mappa Windy (embed pubblico, senza chiave API).
// Usato dalla Home per la vista d'insieme e da Details per la singola città.
const BASE = "https://embed.windy.com/embed2.html";

export function urlMappaWindy({ lat, lon, zoom, overlay, marker = false }) {
  // Windy legge la query come stringhe: "false" sarebbe comunque un valore.
  // Per disattivare il marker il parametro va lasciato vuoto.
  let valoreMarker = "";
  if (marker) valoreMarker = "true";

  const parametri = new URLSearchParams({
    lat,
    lon,
    zoom,
    overlay,
    type: "map",
    menu: "", // nasconde il menu laterale di Windy
    message: "",
    marker: valoreMarker,
  });

  return `${BASE}?${parametri}`;
}
