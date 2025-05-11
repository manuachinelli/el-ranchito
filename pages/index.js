const estadoBomba = document.getElementById("estado-bomba");
const distancia = document.getElementById("distancia");
const lluvia = document.getElementById("lluvia");
const modoAuto = document.getElementById("modo-auto");

const toggleBomba = document.getElementById("toggle-bomba");
const toggleModoAuto = document.getElementById("toggle-modo-auto");

const IP_PROTOA = "192.168.0.83"; // la IP del PROTO A
const IP_PROTOB = "192.168.0.84"; // la IP del PROTO B

function obtenerEstado() {
  fetch(`http://${IP_PROTOA}/estado`)
    .then(res => res.json())
    .then(data => {
      distancia.innerText = `${data.distancia} cm`;
      lluvia.innerText = `${data.estado}`;
      modoAuto.innerText = data.modoAuto ? "Automático" : "Manual";
      toggleModoAuto.checked = data.modoAuto;
    });

  fetch(`http://${IP_PROTOB}/estado-rele`)
    .then(res => res.json())
    .then(data => {
      estadoBomba.innerText = data.rele ? "Encendida" : "Apagada";
      toggleBomba.checked = data.rele;
    });
}

toggleBomba.addEventListener("change", () => {
  const url = toggleBomba.checked
    ? `http://${IP_PROTOB}/encender-rele`
    : `http://${IP_PROTOB}/apagar-rele`;

  fetch(url)
    .then(() => obtenerEstado())
    .catch(err => console.error("Error al cambiar bomba", err));
});

toggleModoAuto.addEventListener("change", () => {
  const url = toggleModoAuto.checked
    ? `http://${IP_PROTOA}/modo-auto`
    : `http://${IP_PROTOA}/modo-manual`;

  fetch(url)
    .then(() => obtenerEstado())
    .catch(err => console.error("Error al cambiar modo", err));
});

setInterval(obtenerEstado, 3000);
obtenerEstado();
