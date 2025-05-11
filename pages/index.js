<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ranchito v1.0</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #fff;
      color: #000;
      text-align: center;
      margin: 0;
      padding: 2rem;
    }
    .header {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 12px;
      color: #666;
    }
    .tanque {
      width: 80px;
      height: 200px;
      border: 2px solid black;
      margin: 1rem auto;
      position: relative;
      background: #eee;
    }
    .nivel {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: black;
    }
    .toggle {
      margin-top: 1rem;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0;
      right: 0; bottom: 0;
      background-color: #000;
      transition: .4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: #fff;
      transition: .4s;
    }
    input:checked + .slider:before {
      transform: translateX(26px);
    }
    .slider.round {
      border-radius: 34px;
    }
    .slider.round:before {
      border-radius: 50%;
    }
  </style>
</head>
<body>
  <div class="header">Ranchito v1.0</div>
  <h2>Tanque de agua</h2>
  <div class="tanque">
    <div class="nivel" id="nivel-agua" style="height: 0%;"></div>
  </div>
  <div>💧 Distancia: <span id="distancia">--</span> cm</div>
  <div style="margin-top: 1rem;">
    🌧️ Lluvia: <span id="lluvia">--</span> → <span id="estado-lluvia">--</span>
  </div>
  <div class="toggle">
    <p>⚙️ Bomba: <span id="estado-rele">--</span></p>
    <label class="switch">
      <input type="checkbox" id="toggle-rele">
      <span class="slider round"></span>
    </label>
  </div>
  <div style="margin-top: 1rem;" id="estado-conexion">Estado conexión: ❌ Error</div>

  <script>
    const distanciaEl = document.getElementById("distancia");
    const lluviaEl = document.getElementById("lluvia");
    const estadoLluviaEl = document.getElementById("estado-lluvia");
    const estadoReleEl = document.getElementById("estado-rele");
    const estadoConexionEl = document.getElementById("estado-conexion");
    const nivelAguaEl = document.getElementById("nivel-agua");
    const toggleReleEl = document.getElementById("toggle-rele");

    let releEstado = false;

    async function actualizarEstado() {
      try {
        const res = await fetch("http://192.168.0.83/estado");
        const data = await res.json();

        distanciaEl.textContent = data.distancia.toFixed(2);
        lluviaEl.textContent = data.lluvia;
        estadoLluviaEl.textContent = data.estado;

        const nivel = Math.max(0, Math.min(100, 100 - (data.distancia / 100) * 100));
        nivelAguaEl.style.height = `${nivel}%`;

        estadoConexionEl.innerHTML = `✅ Online`;
      } catch (e) {
        estadoConexionEl.innerHTML = `❌ Error`;
      }

      try {
        const resRele = await fetch("http://192.168.0.84/estado-rele");
        const dataRele = await resRele.json();
        releEstado = dataRele.rele === 1;
        toggleReleEl.checked = releEstado;
        estadoReleEl.textContent = releEstado ? "Activa" : "Inactiva";
      } catch (e) {
        estadoReleEl.textContent = "--";
      }
    }

    toggleReleEl.addEventListener("change", async () => {
      try {
        await fetch("http://192.168.0.84/activar-rele");
        setTimeout(actualizarEstado, 1000);
      } catch (e) {
        console.log("Error al activar bomba");
      }
    });

    actualizarEstado();
    setInterval(actualizarEstado, 3000);
  </script>
</body>
</html>
