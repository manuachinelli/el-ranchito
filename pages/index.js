import { useState } from 'react';

export default function Home() {
  const [automatic, setAutomatic] = useState(true);

  const toggleAutomatic = () => setAutomatic(!automatic);

  return (
    <div style={{
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>el ranchito</h1>

      <div onClick={toggleAutomatic} style={{
        width: 60,
        height: 30,
        borderRadius: 15,
        backgroundColor: automatic ? '#00c851' : '#555',
        display: 'flex',
        justifyContent: automatic ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        padding: 3,
        marginBottom: 30,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
      }}>
        <div style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: '#fff',
          transition: 'all 0.3s ease'
        }} />
      </div>

      <div style={{
        width: '150px',
        maxWidth: '50vw',
        height: '280px',
        border: '2px solid #fff',
        borderRadius: '20px 20px 0 0',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 20
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '60%',
          backgroundColor: '#00BFFF',
          transition: 'height 0.3s ease'
        }} />
        <span style={{
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          top: '45%',
          transform: 'translateY(-50%)',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          60%
        </span>
      </div>

      <button style={{
        backgroundColor: '#00BFFF',
        color: '#000',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>
        Cargar agua
      </button>
    </div>
  );
}
