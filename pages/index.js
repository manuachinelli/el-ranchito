import { useEffect, useState } from "react";

export default function Home() {
  const [distancia, setDistancia] = useState(null);
  const [lluvia, setLluvia] = useState(null);
  const [estadoBomba, setEstadoBomba] = useState("--");
  const [conexion, setConexion] = useState(false);

  const PROTO_A = "http://192.168.0.83";
  const PROTO_B = "http://192.168.0.84";

  const obtenerDatos = async () => {
    try {
      const res = await fetch(`${PROTO_A}/datos`);
      const data = await res.json();
      setDistancia(data.distancia);
      setLluvia(data.lluvia);
      setConexion(true);
    } catch {
      setConexion(false);
    }

    try {
      const res = await fetch(`${PROTO_B}/estado-rele`);
      const estado = await res.text();
      setEstadoBomba(estado === "1" ? "💡 Activa" : "⛔ Inactiva");
    } catch {
      setEstadoBomba("--");
    }
  };

  const activarBomba = async () => {
    try {
      await fetch(`${PROTO_B}/activar-rele`);
      setTimeout(obtenerDatos, 1000);
    } catch {}
  };

  useEffect(() => {
    obtenerDatos();
    const interval = setInterval(obtenerDatos, 3000);
    return () => clearInterval(interval);
  }, []);

  const estadoLluvia = lluvia == null
    ? "--"
    : lluvia < 500
    ? "🌧 Lluvia ligera"
    : lluvia < 1000
    ? "🌧 Lluvia moderada"
    : "🌧🌊 Diluvio";

  return (
    <main style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>Tanque de agua</h2>
      <div style={{ border: "1px solid black", height: 200, width: 80, marginBottom: 10 }}></div>
      <div>💧 Distancia: {distancia?.toFixed(2) ?? "--"} cm</div>
      <div>🌧 Lluvia: {lluvia ?? "--"} → {estadoLluvia}</div>
      <div>⚙️ Bomba: {estadoBomba}</div>
      <button onClick={activarBomba}>Activar bomba</button>
      <div style={{ marginTop: 10 }}>
        Estado conexión: {conexion ? "✅ OK" : "❌ Error"}
      </div>
    </main>
  );
}
