import { useEffect, useState } from 'react';

export default function Home() {
  const [distancia, setDistancia] = useState('--');
  const [lluvia, setLluvia] = useState('--');
  const [estadoLluvia, setEstadoLluvia] = useState('Seco');
  const [estadoRele, setEstadoRele] = useState('--');
  const [conexion, setConexion] = useState(false);

  const obtenerDatos = async () => {
    try {
      const res = await fetch('http://192.168.0.83/estado');
      const data = await res.json();
      setDistancia(data.distancia.toFixed(2));
      setLluvia(data.lluvia);
      setEstadoLluvia(data.estado);
      setConexion(true);
    } catch (error) {
      setConexion(false);
    }

    try {
      const res = await fetch('http://192.168.0.84/estado-rele');
      const data = await res.json();
      setEstadoRele(data.rele === 1 ? 'Activa' : 'Inactiva');
    } catch (error) {
      setEstadoRele('--');
    }
  };

  const toggleBomba = async () => {
    try {
      await fetch('http://192.168.0.84/activar-rele');
      obtenerDatos(); // Actualiza estado después del toggle
    } catch (error) {
      console.error('Error al activar bomba');
    }
  };

  useEffect(() => {
    obtenerDatos();
    const intervalo = setInterval(obtenerDatos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem', backgroundColor: 'white' }}>
      <div style={{ position: 'absolute', top: 10, right: 20, fontSize: 12, color: '#555' }}>Ranchito v1.0</div>
      <h2 style={{ fontWeight: 'bold' }}>Tanque de agua</h2>
      <div style={{
        width: 80,
        height: 200,
        margin: '1rem auto',
        border: '2px solid black',
        position: 'relative',
        background: '#f9f9f9'
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${Math.min(100 - distancia, 100)}%`,
          backgroundColor: '#333'
        }}></div>
      </div>

      <p>💧 Distancia: {distancia} cm</p>
      <p>🌧️ <strong>Lluvia: {lluvia}</strong> → {estadoLluvia === 'Seco' ? '🌤️' : '🌧️ ' + estadoLluvia}</p>
      <p>⚙️ <strong>Bomba: {estadoRele}</strong></p>

      <button
        onClick={toggleBomba}
        style={{
          backgroundColor: '#fff',
          color: '#000',
          padding: '0.5rem 1rem',
          border: '1px solid black',
          margin: '1rem auto',
          cursor: 'pointer'
        }}
      >
        {estadoRele === 'Activa' ? 'Apagar bomba' : 'Activar bomba'}
      </button>

      <p>Estado conexión: {conexion ? '✅ Ok' : '❌ Error'}</p>
    </div>
  );
}
