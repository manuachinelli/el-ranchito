document.addEventListener("DOMContentLoaded", () => {
  const distanciaEl = document.getElementById("distancia");
  const lluviaEl = document.getElementById("lluvia");
  const estadoLluviaEl = document.getElementById("estado-lluvia");
  const estadoBombaEl = document.getElementById("estado-bomba");
  const nivelTanqueEl = document.getElementById("nivel-tanque");
  const conexionEl = document.getElementById("estado-conexion");
  const boton = document.getElementById("boton-bomba");

  const PROTO_A = "http://192.168.0.83";
  const PROTO_B = "http://192.168.0.84";

  async function actualizarDatos() {
    try {
      const res = await fetch(`${PROTO_A}/datos`);
      const data = await res.json();

      const { distancia, lluvia } = data;
      distanciaEl.innerText = distancia.toFixed(2);

      // actualizamos nivel visual del tanque
      const porcentaje = Math.max(0, Math.min(1, (250 - distancia) / 250));
      nivelTanqueEl.style.height = `${porcentaje * 100}%`;

      lluviaEl.innerText = lluvia;
      if (lluvia < 500) estadoLluviaEl.innerText = "🌧 Lluvia ligera";
      else if (lluvia < 1000) estadoLluviaEl.innerText = "🌧 Lluvia moderada";
      else estadoLluviaEl.innerText = "🌧🌊 Diluvio";

      conexionEl.innerHTML = '✅ Conectado';
    } catch (e) {
      conexionEl.innerHTML = '❌ Error';
    }

    try {
      const resB = await fetch(`${PROTO_B}/estado-rele`);
      const estado = await resB.text();
      estadoBombaEl.innerText = estado === "1" ? "💡 Activa" : "⛔ Inactiva";
    } catch (e) {
      estadoBombaEl.innerText = "--";
    }
  }

  boton.addEventListener("click", async () => {
    try {
      await fetch(`${PROTO_B}/activar-rele`);
      setTimeout(actualizarDatos, 1000);
    } catch (e) {
      console.log("Error al activar la bomba");
    }
  });

  setInterval(actualizarDatos, 3000);
  actualizarDatos();
});
