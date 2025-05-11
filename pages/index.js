import { useEffect, useState } from 'react';

export default function Home() {
  const [distancia, setDistancia] = useState('--');
  const [lluvia, setLluvia] = useState('--');
  const [estadoLluvia, setEstadoLluvia] = useState('Seco');
  const [estadoRele, setEstadoRele] = useState(null);
  const [conexion, setConexion] = useState(false);

  const obtenerDatos = async () => {
    try {
      const res = await fetch('http://192.168.0.83/estado');
      const data = await res.json();
      setDistancia(data.distancia.toFixed(2));
      setLluvia(data.lluvia);
      setEstadoLluvia(data.estado);
      setConexion(true);
    } catch {
      setConexion(false);
    }

    try {
      const res = await fetch('http://192.168.0.84/estado-rele');
      const data = await res.json();
      setEstadoRele(data.rele === 1);
    } catch {
      setEstadoRele(null);
    }
  };

  const toggleBomba = async () => {
    try {
      await fetch('http://192.168.0.84/activar-rele');
      obtenerDatos(); // refrescar
    } catch {
      console.error('Error al activar/desactivar bomba');
    }
  };

  useEffect(() => {
    obtenerDatos();
    const intervalo = setInterval(obtenerDatos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem', background: 'white' }}>
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
      <p>⚙️ <strong>Bomba:</strong></p>

      {estadoRele !== null && (
        <label style={{
          display: 'inline-block',
          width: 60,
          height: 30,
          background: estadoRele ? '#000' : '#fff',
          border: '2px solid black',
          borderRadius: 15,
          position: 'relative',
          cursor: 'pointer',
          marginBottom: 10
        }}>
          <input
            type="checkbox"
            checked={estadoRele}
            onChange={toggleBomba}
            style={{ display: 'none' }}
          />
          <span style={{
            content: '',
            position: 'absolute',
            top: 2,
            left: estadoRele ? 32 : 2,
            width: 24,
            height: 24,
            background: estadoRele ? '#fff' : '#000',
            borderRadius: '50%',
            transition: 'left 0.2s'
          }}></span>
        </label>
      )}

      <p>Estado conexión: {conexion ? '✅ Ok' : '❌ Error'}</p>
    </div>
  );
}
