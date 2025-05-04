export default function Home() {
  return (
    <div style={{
      backgroundColor: '#000',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>el ranchito</h1>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px' }}>automatic</label>
        <input type="checkbox" defaultChecked style={{ marginLeft: '10px' }} />
      </div>
      <div style={{
        width: '100px',
        height: '180px',
        border: '2px solid #fff',
        borderRadius: '10px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '10px'
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '60%',
          backgroundColor: '#00BFFF'
        }} />
        <span style={{
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '14px'
        }}>
          60%
        </span>
      </div>
      <button style={{
        backgroundColor: 'transparent',
        color: '#fff',
        border: 'none',
        fontSize: '20px',
        marginTop: '10px'
      }}>⋮</button>
    </div>
  );
}

