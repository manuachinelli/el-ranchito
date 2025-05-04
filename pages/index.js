export default function Home() {
  const percentage = 60;
  const automatic = true;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>El Ranchito</h1>

      <div style={styles.toggleContainer}>
        <span style={styles.toggleLabel}>automatic</span>
        <div
          style={{
            ...styles.toggle,
            backgroundColor: automatic ? '#00cc66' : '#333',
          }}
        >
          <div
            style={{
              ...styles.toggleCircle,
              marginLeft: automatic ? '24px' : '2px',
            }}
          />
        </div>
      </div>

      <div style={styles.tankContainer}>
        <div style={{ ...styles.water, height: `${percentage}%`, backgroundColor: percentage < 20 ? 'red' : '#33ccff' }}>
          <span style={styles.waterText}>{percentage}%</span>
        </div>
      </div>

      <button style={styles.button} onClick={() => alert('Cargar agua')}>
        Cargar agua
      </button>

      <div style={styles.moreDots}>⋯</div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    height: '100vh',
    paddingTop: '40px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    gap: '8px',
  },
  toggleLabel: {
    fontSize: '14px',
  },
  toggle: {
    width: '40px',
    height: '20px',
    borderRadius: '10px',
    backgroundColor: '#333',
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  toggleCircle: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '2px',
    transition: 'all 0.3s ease',
  },
  tankContainer: {
    width: '100px',
    height: '200px',
    border: '2px solid white',
    borderRadius: '12px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column-reverse',
    backgroundColor: '#000',
  },
  water: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  button: {
    marginTop: '30px',
    padding: '10px 20px',
    border: '1px solid white',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  moreDots: {
    fontSize: '24px',
    marginTop: '32px',
  },
};
