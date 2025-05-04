import React, { useState } from 'react';

export default function Home() {
  const [automatic, setAutomatic] = useState(true);
  const [percent, setPercent] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleAutomatic = () => {
    const newValue = !automatic;
    setAutomatic(newValue);
    fetch('https://tu-n8n.com/webhook/automatico', {
      method: 'POST',
      body: JSON.stringify({ automatico: newValue }),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  const handleCargarAgua = () => {
    setIsLoading(true);
    fetch('https://tu-n8n.com/webhook/cargar-agua', {
      method: 'POST'
    }).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        setPercent(90); // simulamos que llegó al 90%
      }, 5000);
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>El Ranchito</h1>

      <div style={styles.switchContainer}>
        <span style={styles.switchLabel}>automatic</span>
        <div
          onClick={handleToggleAutomatic}
          style={{
            ...styles.toggle,
            backgroundColor: automatic ? '#4CAF50' : '#555',
            justifyContent: automatic ? 'flex-end' : 'flex-start'
          }}
        >
          <div style={styles.toggleHandle}></div>
        </div>
      </div>

      <div style={styles.tank}>
        <div
          style={{
            ...styles.water,
            height: `${percent}%`,
            backgroundColor: percent < 20 ? '#ff4d4d' : '#00bfff'
          }}
        >
          <span style={styles.percentage}>{percent}%</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={styles.bottomBar}>
        <button style={styles.sideButton}>Estado</button>
        <button style={styles.centralButton} onClick={handleCargarAgua}>
          {isLoading ? <div style={styles.loader}></div> : '+'}
        </button>
        <button style={styles.sideButton}>Info</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#000',
    color: '#fff',
    minHeight: '100vh',
    width: '100vw',
    overflow: 'hidden',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: 20,
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
  toggle: {
    width: 50,
    height: 26,
    borderRadius: 13,
    padding: 3,
    display: 'flex',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  toggleHandle: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: '50%',
    transition: 'all 0.3s',
  },
  tank: {
    width: 100,
    height: 200,
    border: '2px solid white',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 100,
  },
  water: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid #333',
  },
  sideButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer',
  },
  centralButton: {
    backgroundColor: '#fff',
    border: 'none',
    color: '#000',
    width: 50,
    height: 50,
    borderRadius: 25,
    fontSize: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  loader: {
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    width: 20,
    height: 20,
    animation: 'spin 1s linear infinite',
  },
};
