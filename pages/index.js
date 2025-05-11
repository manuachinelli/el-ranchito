<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ranchito v.1.0</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #fff;
      color: #000;
      text-align: center;
      padding: 20px;
    }
    .header {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 12px;
    }
    .tanque {
      width: 80px;
      height: 200px;
      margin: 0 auto;
      border: 2px solid black;
      position: relative;
      background: #eee;
    }
    .nivel {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #000;
    }
    .toggle-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
    .toggle-label {
      margin-right: 10px;
      font-size: 20px;
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
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
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
    input:checked + .slider {
      background-color: #000;
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
  <div class="header">Ranchito v.1.0</div>
  <h2>Tanque de agua</h2>
  <div class="tanque">
    <div class="nivel" id="nivel-tanque" style="height: 0%;"></div>
  </div>
  <div id="distancia">💧 Distancia: -- cm</div>
  <div style="margin-top: 20px; font-size: 20px;">
    🌧️ Lluvia: <span id="lluvia">--</span> → <span id="lluvia-estado">--</span>
  </div>
  <div class="toggle-container">
    <span class="toggle-label">⚙️ Bomba:</span>
    <label class="switch">
      <input type="checkbox" id="toggle-bomba">
      <span class="slider round"></span>
    </label>
  </div>
  <div style="margin-top: 20px;" id="estado-conexion">Estado conexión: ❌ Error</div>

  <script>
    const ENDPOINT_PROTOA = "http://192.168.0.83/estado";
    const ENDPOINT_PROTOB = "http://192.168.0.84/estado-rele";
    const BOTON_RELE = "http://192.168.0.84/activar-rele";

    const lluviaSpan = document.getElementById("lluvia");
    const lluviaEstado = document.getElementById("lluvia-estado");
    const distanciaTexto = document.getElementById("distancia");
    const nivelTanque = document.getElementById("nivel-tanque");
    const estadoConexion = document.getElementById("estado-conexion");
    const toggleBomba = document.getElementById("toggle-bomba");

    let estadoRele = false;
    let bloqueado = false;

    function actualizar() {
      // --- PROTO A ---
      fetch(ENDPOINT_PROTOA)
        .then((res) => res.json())
        .then((data) => {
          const { distancia, lluvia, estado } = data;
          distanciaTexto.textContent = `💧 Distancia: ${distancia.toFixed(2)} cm`;
          let porcentaje = Math.max(0, Math.min(100, (1 - distancia / 100) * 100));
          nivelTanque.style.height = `${porcentaje}%`;
          lluviaSpan.textContent = `${lluvia}`;
          lluviaEstado.textContent = `${estado}`;
          estadoConexion.innerHTML = `Estado conexión: ✅ OK`;
        })
        .catch(() => {
          estadoConexion.innerHTML = `Estado conexión: ❌ Error`;
        });

      // --- PROTO B ---
      fetch(ENDPOINT_PROTOB)
        .then((res) => res.json())
        .then((data) => {
          estadoRele = data.rele === 1;
          toggleBomba.checked = estadoRele;
        });
    }

    toggleBomba.addEventListener("change", () => {
      if (bloqueado) return;
      bloqueado = true;
      fetch(BOTON_RELE)
        .then(() => {
          setTimeout(() => {
            actualizar();
            bloqueado = false;
          }, 500);
        });
    });

    actualizar();
    setInterval(actualizar, 3000);
  </script>
</body>
</html>
