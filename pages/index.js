<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ranchito v1.0</title>
  <style>
    body {
      font-family: sans-serif;
      background: #fff;
      color: #000;
      text-align: center;
      margin: 0;
      padding: 2rem;
    }
    .tanque {
      width: 60px;
      height: 200px;
      border: 2px solid black;
      margin: 0 auto;
      position: relative;
    }
    .agua {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: black;
    }
    button {
      background: black;
      color: white;
      border: none;
      padding: 10px 20px;
      margin-top: 1rem;
      cursor: pointer;
    }
    .estado {
      margin-top: 1rem;
    }
    .conectado {
      color: green;
    }
    .error {
      color: red;
    }
    .esquina {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 12px;
      opacity: 0.6;
    }
  </style>
</head>
<body>
  <div class="esquina">Ranchito v1.0</div>
  <h2>Tanque de agua</h2>
  <div class="tanque">
    <div id="nivelAgua" class="agua" style="height:0%"></div>
  </div>
  <p>💧 Distancia: <span id="distancia">--</span> cm</p>
  <h3>🌧️ Lluvia: <span id="lluvia">--</span> → <span id="estadoLluvia">☀️ Seco</span></h3>
  <h3>⚙️ Bomba: <span id="bomba">--</span></h3>
  <button onclick="activarBomba()">Activar bomba</button>
  <div class="estado">
    Estado conexión: <span id="conexion" class="error">❌ Error</span>
  </div>

  <script>
    const IP_PROTOA = "http://192.168.0.83";
    const IP_PROTOB = "http://192.168.0.84";

    async function actualizarDatos() {
      try {
        const [a, b] = await Promise.all([
          fetch(IP_PROTOA + "/estado").then(r => r.json()),
          fetch(IP_PROTOB + "/estado-rele").then(r => r.text())
        ]);

        document.getElementById("distancia").textContent = a.distancia.toFixed(2);
        document.getElementById("lluvia").textContent = a.lluvia;
        document.getElementById("estadoLluvia").textContent = a.estado_lluvia;
        document.getElementById("bomba").textContent = b === "1" ? "Activa" : "Inactiva";
        document.getElementById("conexion").textContent = "✅ OK";
        document.getElementById("conexion").className = "conectado";

        const porcentaje = Math.max(0, Math.min(100, 100 - (a.distancia / 100 * 100)));
        document.getElementById("nivelAgua").style.height = porcentaje + "%";
      } catch (e) {
        document.getElementById("conexion").textContent = "❌ Error";
        document.getElementById("conexion").className = "error";
      }
    }

    function activarBomba() {
      fetch(IP_PROTOB + "/activar-rele");
    }

    setInterval(actualizarDatos, 3000);
    actualizarDatos();
  </script>
</body>
</html>
