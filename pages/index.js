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
      color: #111;
      margin: 0;
      padding: 1em;
    }
    header {
      text-align: right;
      font-size: 0.8em;
      margin-bottom: 2em;
    }
    .container {
      display: grid;
      gap: 2em;
    }
    .card {
      border: 2px solid #000;
      padding: 1em;
    }
    .status {
      font-size: 1.2em;
    }
    .barra {
      height: 200px;
      width: 60px;
      border: 2px solid #000;
      position: relative;
      background: #e0e0e0;
      margin: 1em 0;
    }
    .nivel {
      background: #000;
      width: 100%;
      position: absolute;
      bottom: 0;
    }
    button {
      background: none;
      border: 2px solid #000;
      padding: 0.5em 1em;
      cursor: pointer;
      font-weight: bold;
      transition: 0.2s;
    }
    button:hover {
      background: #000;
      color: #fff;
    }
  </style>
</head>
<body>
  <header>Ranchito v1.0</header>
  <div class="container">
    <div class="card">
      <div class="status"><strong>💧 Bomba:</strong> <span id="bombaEstado">Cargando...</span></div>
      <button onclick="activarBomba()">Activar bomba</button>
    </div>
    <div class="card">
      <div><strong>📏 Tanque:</strong> <span id="distancia">-</span> cm</div>
      <div class="barra">
        <div id="nivel" class="nivel" style="height: 0%"></div>
      </div>
    </div>
    <div class="card">
      <div><strong>🌧️ Lluvia:</strong> <span id="lluviaNivel">-</span></div>
      <div id="estadoLluvia">-</div>
    </div>
  </div>

  <script>
    async function cargarDatos() {
      try {
        const protoA = await fetch("http://protoa.local/estado");
        const data = await protoA.json();
        document.getElementById("distancia").textContent = data.distancia.toFixed(2);

        const porcentaje = Math.max(0, Math.min(100, 100 - (data.distancia)));
        document.getElementById("nivel").style.height = `${porcentaje}%`;

        document.getElementById("lluviaNivel").textContent = data.lluvia;
        document.getElementById("estadoLluvia").textContent = `☁️ ${data.estadoLluvia}`;
      } catch (e) {
        console.log("Error cargando datos de Proto A", e);
      }

      try {
        const protoB = await fetch("http://rele.local/estado-rele");
        const estado = await protoB.text();
        document.getElementById("bombaEstado").textContent = estado.includes("1") ? "Activa" : "Inactiva";
      } catch (e) {
        console.log("Error cargando datos de Proto B", e);
      }
    }

    async function activarBomba() {
      try {
        await fetch("http://rele.local/activar-rele");
        setTimeout(cargarDatos, 1000); // recarga después de activar
      } catch (e) {
        alert("No se pudo activar la bomba");
      }
    }

    setInterval(cargarDatos, 3000);
    cargarDatos();
  </script>
</body>
</html>

