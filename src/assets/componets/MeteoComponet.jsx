import { useState } from "react";

function MeteoComponent() {
  const [citta, setCitta] = useState("");
  const [meteoData, setMeteoData] = useState(null);
  const [luogo, setLuogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cercaMeteo = async () => {
    const nome = citta.trim();
    if (!nome) return;

    setLoading(true);
    setError(null);
    setMeteoData(null);
    setLuogo(null);

    try {
      // 1. Geocoding: nome città → coordinate
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          nome,
        )}&count=1&language=it&format=json`,
      );
      if (!geoRes.ok) throw new Error("Errore nel geocoding della città");
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`Nessuna città trovata per "${nome}"`);
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      setLuogo({ name, country });

      // 2. Meteo: coordinate → dati attuali
      const meteoRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
      );
      if (!meteoRes.ok) throw new Error("Errore nel recupero dei dati meteo");
      const data = await meteoRes.json();

      setMeteoData(data.current_weather);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") cercaMeteo();
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "2rem auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          type="text"
          value={citta}
          onChange={(e) => setCitta(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Inserisci una città..."
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={cercaMeteo}
          disabled={loading}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#fff",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Cerca
        </button>
      </div>

      {loading && <p>Caricamento dati meteo...</p>}
      {error && (
        <p style={{ color: "#dc2626" }}>Si è verificato un errore: {error}</p>
      )}

      {meteoData && luogo && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            Meteo Attuale — {luogo.name}
            {luogo.country ? `, ${luogo.country}` : ""}
          </h3>
          <p>
            Temperatura: <strong>{meteoData.temperature}°C</strong>
          </p>
          <p>
            Velocità del vento: <strong>{meteoData.windspeed} km/h</strong>
          </p>
          <p>
            Direzione vento: <strong>{meteoData.winddirection}°</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default MeteoComponent;
