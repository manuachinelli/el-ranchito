import { useEffect, useState } from 'react';

export default function Home() {
  const [distancia, setDistancia] = useState(null);
  const [lluvia, setLluvia] = useState(null);
  const [rele, setRele] = useState(null);
  const [status, setStatus] = useState('🔄');

  const fetchData = async () => {
    try {
      const a = await fetch('http://protoa.local/data'); // o http://192.168.0.83/data
      const datos = await a.json();
      setDistancia(datos.distancia);
      setLluvia(datos.lluvia);

      const b = await fetch('http://rele.local/estado-rele'); // o http://192.168.0.84/estado-rele
      const estadoRele = await b.json();
      setRele(estadoRele.activo);
      setStatus('✅');
    } catch (err) {
      setStatus('❌ Error');
    }
  };

  const activarRele = async () => {
    await fetch('http://rele.local/activar-rele');
    fetchData();
  };

  useEffect(() => {
    fetchData();
    const intervalo = setInterval(fetchData, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const porcentaje = distancia !== null ? Math.max(0, Math.min(100, 100 - distancia)) : 0;
  const lluviaEstado = lluvia > 1000 ? '🌧️ Diluvio' : lluvia > 500 ? '🌦️ Lluvia moderada' : '🌤️ Seco';

  return (
    <div style={estilo.pagina}>
      <header style={estilo.header}>
        <span>Ranchito v1.0</span>
      </header>

      <main style={estilo.main}>
        <h1 style={estilo.titulo}>Tanque de agua</h1>

        <div style={estilo.tanque}>
          <div style={{ ...estilo.agua, height: `${porcentaje}%` }} />
        </div>
        <p>💧 Distancia: {distancia ?? '--'} cm</p>

        <h2>🌧️ Lluvia: {lluvia ?? '--'} → {lluviaEstado}</h2>

        <h2>⚙️ Bomba: {rele === true ? '🟢 Activa' : rele === false ? '🔴 Apagada' : '--'}</h2>

        <button style={estilo.boton} onClick={activarRele}>Activar bomba</button>
        <p style={estilo.status}>Estado conexión: {status}</p>
      </main>
    </div>
  );
}

const estilo = {
  pagina: {
    fontFamily: 'sans-serif',
    backgroundColor: '#fff',
    color: '#111',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'right',
    fontSize: '0.8rem',
    marginBottom: '10px',
  },
  main: {
    textAlign: 'center',
  },
  titulo: {
    margin: '0.5em 0',
    fontSize: '1.5rem',
  },
  tanque: {
    height: '200px',
    width: '80px',
    border: '2px solid #111',
    margin: 'auto',
    position: 'relative',
    marginBottom: '1em',
  },
  agua: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#00bcd4',
    transition: 'height 0.5s ease',
  },
  boton: {
    padding: '10px 20px',
    marginTop: '10px',
    cursor: 'pointer',
    background: '#111',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
  },
  status: {
    marginTop: '10px',
    fontSize: '0.9rem',
    color: '#555',
  }
};
