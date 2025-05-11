import { useEffect, useState } from 'react';

export default function Home() {
  const [distancia, setDistancia] = useState('--');
  const [nivelLluvia, setNivelLluvia] = useState('--');
  const [estadoLluvia, setEstadoLluvia] = useState('Seco');
  const [estadoConexion, setEstadoConexion] = useState(false);
  const [releActivado, setReleActivado] = useState(false);

  useEffect(() => {
    const fetchEstado = async () => {
      try {
        const res = await fetch('http://192.168.0.83/estado');
        const data = await res.json();
        setDistancia(data.distancia.toFixed(2));
        setNivelLluvia(data.lluvia);
        setEstadoLluvia(data.estado);
        setEstadoConexion(true);
      } catch (error) {
        setEstadoConexion(false);
      }
    };

    const fetchEstadoRele = async () => {
      try {
        const res = await fetch('http://192.168.0.84/estado-rele');
        const data = await res.json();
        setReleActivado(data.rele === 1);
      } catch (error) {
        console.log("Error al obtener estado del relé");
      }
    };

    fetchEstado();
    fetchEstadoRele();
    const interval = setInterval(() => {
      fetchEstado();
      fetchEstadoRele();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleRele = async () => {
    try {
      await fetch('http://192.168.0.84/activar-rele');
      setReleActivado(prev => !prev);
    } catch (error) {
      console.log("Error al activar/desactivar relé");
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '20px' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, fontSize: '12px' }}>Ranchito v.1.0</div>
      <h2>Tanque de agua</h2>
      <div style={{ width: 80, height: 200, border: '2px solid black', margin: 'auto', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: `${Math.min(100, 100 - distancia)}%`,
          backgroundColor: 'black'
        }} />
      </div>
      <p>💧 Distancia: {distancia} cm</p>
      <h3>🌧️ Lluvia: {nivelLluvia} → {estadoLluvia}</h3>
      <h3>⚙️ Bomba: {releActivado ? 'Activa' : 'Inactiva'}</h3>
      <button onClick={toggleRele} style={{ padding: '10px 20px', marginTop: '10px', cursor: 'pointer' }}>
        {releActivado ? 'Apagar bomba' : 'Activar bomba'}
      </button>
      <p style={{ marginTop: '10px' }}>
        Estado conexión: {estadoConexion ? '✅ OK' : '❌ Error'}
      </p>
    </div>
  );
}
