import { useState, useEffect } from "react";

export default function Home() {
  const [automatic, setAutomatic] = useState(true);
  const [percentage, setPercentage] = useState(60);
  const [isFilling, setIsFilling] = useState(false);

  useEffect(() => {
    if (isFilling && percentage >= 90) {
      setIsFilling(false);
    }
  }, [percentage, isFilling]);

  const toggleAutomatic = () => {
    const newValue = !automatic;
    setAutomatic(newValue);
    fetch("https://tu-n8n.com/webhook/automatico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ automatic: newValue }),
    });
  };

  const startFilling = () => {
    setIsFilling(true);
    fetch("https://tu-n8n.com/webhook/llenar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trigger: true }),
    });
  };

  const stopFilling = () => {
    setIsFilling(false);
    fetch("https://tu-n8n.com/webhook/apagar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stop: true }),
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>El Ranchito</h1>

        <div style={styles.switchContainer}>
          <span style={styles.label}>automatic</span>
          <div
            style={{
              ...styles.switch,
              backgroundColor: automatic ? "#2ecc71" : "#555",
            }}
            onClick={toggleAutomatic}
          >
            <div
              style={{
                ...styles.knob,
                transform: automatic ? "translateX(20px)" : "translateX(0)",
              }}
            />
          </div>
        </div>

        <div style={styles.tank}>
          <div
            style={{
              ...styles.fill,
              height: `${percentage}%`,
              backgroundColor: isFilling ? "#00ff00" : percentage < 20 ? "#ff4d4d" : "#00bfff",
              animation: isFilling ? "pulse 1s infinite alternate" : "none",
            }}
          >
            <span style={styles.percentageText}>
              {percentage}% {isFilling && <span style={styles.bolt}>⚡</span>}
            </span>
          </div>
        </div>

        <div style={styles.navbar}>
          <button
            style={{
              ...styles.fab,
              backgroundColor: isFilling ? "#555" : "#00bfff",
              cursor: isFilling ? "default" : "pointer",
            }}
            onClick={() => !isFilling && startFilling()}
          >
            {isFilling ? "⏳" : "+"}
          </button>

          <button
            style={styles.stopButton}
            onClick={stopFilling}
          >
            X
          </button>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          background-color: #000;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#000",
  },
  container: {
    color: "#fff",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  switchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
  },
  label: {
    fontSize: "16px",
  },
  switch: {
    width: "40px",
    height: "20px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    padding: "2px",
    transition: "background-color 0.3s",
  },
  knob: {
    width: "16px",
    height: "16px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    transition: "transform 0.3s",
  },
  tank: {
    width: "120px",
    height: "250px",
    border: "2px solid #fff",
    borderRadius: "15px",
    margin: "0 auto 30px auto",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#000",
  },
  fill: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "height 0.5s, background-color 0.5s",
  },
  percentageText: {
    fontSize: "18px",
    color: "#fff",
    fontWeight: "bold",
    position: "absolute",
    top: "10px",
    width: "100%",
    textAlign: "center",
  },
  bolt: {
    fontSize: "24px",
    marginLeft: "6px",
  },
  navbar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#111",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  fab: {
    width: "60px",
    height: "60px",
    borderRadius: "30px",
    fontSize: "28px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
  },
  stopButton: {
    width: "40px",
    height: "40px",
    borderRadius: "20px",
    fontSize: "22px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
