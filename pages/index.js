import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const ENDPOINT_PROTOA = "http://192.168.0.83/estado";
    const ENDPOINT_PROTOB = "http://rele.local/estado-rele";
    const BOTON_RELE = "http://rele.local/activar-rele";

    const lluviaSpan = document.getElementById("lluvia");
    const lluviaEstado = document.getElementById("lluvia-estado");
    const bombaEstado = document.getElementById("bomba");
    const distanciaTexto = document.getElementById("distancia");
    const nivelTanque = document.getElementById("nivel-tanque");
    const estadoConexion = document.getElementById("estado-conexion");
    const boton = document.getElementById("activar");

    function actualizar() {
      fetch(ENDPOINT_PROTOA)
        .then((res) => res.json())
        .then((data) => {
          const { distancia, lluvia, estado } = data;
          distanciaTexto.textContent = `💧 Distancia: ${distancia.toFixed(2)} cm`;
          let porcentaje = Math.max(0, Math.min(100, (1 - distancia / 100) * 100));
          nivelTanque.style.height = `${porcentaje}%`;
          nivelTanque.style.backgroundColor = "#000";
          lluviaSpan.textContent = `🌧️ Lluvia: ${lluvia}`;
          lluviaEstado.textContent = `→ ${estado}`;
          estadoConexion.innerHTML = `Estado conexión: ✅ OK`;
        })
        .catch(() => {
          estadoConexion.innerHTML = `Estado conexión: ❌ Error`;
        });

      fetch(ENDPOINT_PROTOB)
        .then((res) => res.json())
        .then((data) => {
          bombaEstado.textContent = `⚙️ Bomba: ${data.rele ? "Activa" : "Inactiva"}`;
        });
    }

    boton.addEventListener("click", () => {
      fetch(BOTON_RELE);
    });

    actualizar();
    setInterval(actualizar, 3000);
  }, []);

  return null; // porque el HTML lo manejás por separado en public/index.html
}
