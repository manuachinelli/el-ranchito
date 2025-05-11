import React, { useEffect, useState } from 'react';

export default function Home() {
  const [distancia, setDistancia] = useState('--');
  const [lluvia, setLluvia] = useState('--');
  const [estadoLluvia, setEstadoLluvia] = useState('Seco');
  const [bomba, setBomba] = useState('--');
  const [conexion, setConexion] = useState(false);

  useEffect(() => {
    const actualizarDatos = async () => {
      try {
        const res = await fetch('http://192.168.0.83/datos');
        const data = await res.json();
        setConexion(true);
        setDistancia(data.distancia.toFixed(2));
        setLluvia(data.lluvia);
        setEstadoLluvia(data.estadoLluvia);
      } catch (e) {
        setConexion(false);
      }

      try {
        const res2 = await fetch('http://rele.local/estado-rele');
        const data2 = await res2.json();
        setBomba(data2.activado ? 'Activa' : 'Inactiva');
      } catch (e) {
        console.log('Error al obtener estado del relé');
      }
    };

    actualizarDatos();
    const interval = setInterval(actualizarDatos, 3000);
    return () => clearInterval(interval);
  }, []);

  const activarBomba = async () => {
    try {
      await fetch('http://rele.local/activar-rele');
    } catch (e) {
      console.log('Error al activar bomba');
    }
  };

  const lluviaIcono = () => {
    if (estadoLluvia === 'Diluvio') return '🌊 Diluvio';
    if (estadoLluvia === 'Lluvia moderada') return '🌧️ Moderada';
    if (estadoLluvia === 'Garuando') return '🌦️ Garúa';
    return '🌤️ Seco';
  };

  return (
    <div style={{ fontFamily: 'Arial', backgroundColor: '#fff', color: '#000', textAlign: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 12 }}>Ranchito v.1.0</div>
      <h2>Tanque de agua</h2>
      <div style={{ width: 80, height: 200, margin: '0 auto', border: '2px solid black', position: 'relative', background: '#eee' }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          background: '#000',
          height: `${Math.min(100, Math.max(0, 100 - distancia))}%`
        }} />
      </div>
      <div style={{ marginTop: 10 }}>💧 Distancia: {distancia} cm</div>

      <div style={{ marginTop: 20, fontSize: 20 }}>
        🌧️ Lluvia: {lluvia} → {lluviaIcono()}
      </div>

      <div style={{ marginTop: 20, fontSize: 20 }}>
        ⚙️ Bomba: {bomba}
      </div>

      <button
        onClick={activarBomba}
        style={{
          marginTop: 20,
          padding: '10px 20px',
          background: '#000',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Activar bomba
      </button>

      <div style={{ marginTop: 20 }}>
        Estado conexión: {conexion ? '✅ Ok' : '❌ Error'}
      </div>
    </div>
  );
}
