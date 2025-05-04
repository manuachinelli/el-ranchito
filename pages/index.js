import { useState } from 'react';

export default function Home() {
  const [automatic, setAutomatic] = useState(false);
  const waterLevel = 60; // Podés cambiar esto para testear

  const tankColor = waterLevel < 20 ? '#FF4C4C' : '#00BFFF';

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>El Ranchito</h1>

      <div style={styles.toggleRow}>
        <span style={styles.label}>automatic</span>
        <div
          style={{
            ...styles.toggle,
            backgroundColor: automatic ? '#4CAF50' : '#444',
          }}
          onClick={() => setAutomatic(!automatic)}
        >
          <div
            style={{
              ...styles.toggleDot,
              transform: automatic ? 'translateX(20px)' : 'translateX(0px)',
            }}
          />
        </div>
      </div>

      <div style={styles.tank}>
        <div
          style={{
            ...styles.water,
            height: `${waterLevel}%`,
            backgroundColor: tankColor,
          }}
        >
          <span style={styles.waterText}>{waterLevel}%</span>
        </div>
      </div>

      <button style={styles.button}>Cargar agua</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#000',
    color: '#fff',
    minHeight: '100vh',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
    gap: 10,
  },
  label: {
    fontSize: 16,
  },
  toggle: {
    width: 40,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#444',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.3s',
  },
  toggleDot: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 1,
    left: 1,
    transition: 'transform 0.3s',
  },
  tank: {
    width: 120,
    height: 200,
    border: '2px solid white',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 30,
  },
  water: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    transition: 'height 0.5s',
  },
  waterText: {
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'transparent',
    border: '2px solid white',
    color: 'white',
    padding: '10px 20px',
    borderRadius: 5,
    cursor: 'pointer',
  },
};
