import { useEffect, useState } from 'react';

export default function Home() {
  const [distancia, setDistancia] = useState(null);
  const [lluvia, setLluvia] = useState(null);
  const [estadoLluvia, setEstadoLluvia] = useState('--');
  const [rele, setRele] = useState(null);
  const [conexion, setConexion] = useState(false);

  const ipProtoA = '192.168.0.83';
  const ipProtoB = '192.168.0.84';

  const actualizar = async () => {
    try {
      const res = await fetch(`http://${ipProtoA}/estado`);
      const data = await res.json();
      setDistancia(data.distancia);
      setLluvia(data.lluvia);
      setEstadoLluvia(data.estado);
      setConexion(true);
    } catch {
      setConexion(false);
    }

    try {
      const res = await fetch(`http://${ipProtoB}/estado-rele`);
      const data = await res.json();
      setRele(data.rele === 1);
    } catch {
      setRele(null);
    }
  };

  const toggleRele = async () => {
    try {
      await fetch(`http://${ipProtoB}/activar-rele`);
      setTimeout(actualizar, 1500);
    } catch (e) {
      console.log("Error al activar bomba");
    }
  };

  useEffect(() => {
    actualizar();
    const interval = setInterval(actualizar, 3000);
    return () => clearInterval(interval);
  }, []);

  const porcentaje = distancia != null ? Math.max(0, Math.min(100, 100 - (distancia / 100) * 100)) : 0;

  return (
    <div style={{ fontFamily: 'Arial', color: '#000', padding: '2rem', textAlign: 'center' }}>
      <div style={{ position: 'absolute', top: 10, right: 20, fontSize: 12, color: '#666' }}>Ranchito v1.0</div>
      <h2>Tanque de agua</h2>
      <div style={{ width: 80, height: 200, border: '2px solid black', margin: '1rem auto', background: '#eee', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'black', height: `${porcentaje}%` }} />
      </div>
      <p>💧 Distancia: {distancia != null ? `${distancia.toFixed(2)} cm` : '--'}</p>
      <p>🌧️ Lluvia: {lluvia ?? '--'} → {estadoLluvia}</p>
      <p>⚙️ Bomba: {rele == null ? '--' : rele ? 'Activa' : 'Inactiva'}</p>

      <label style={{ display: 'inline-block', marginTop: '1rem' }}>
        <input type="checkbox" checked={rele || false} onChange={toggleRele} style={{ transform: 'scale(1.5)', marginRight: '0.5rem' }} />
        {rele ? 'Apagar bomba' : 'Activar bomba'}
      </label>

      <p style={{ marginTop: '1rem' }}>
        Estado conexión: {conexion ? '✅ Online' : '❌ Error'}
      </p>
    </div>
  );
}
