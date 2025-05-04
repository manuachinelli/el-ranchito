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
    setAutomatic(!automatic);
    fetch("https://tu-n8n.com/webhook/automatico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ automatic: !automatic }),
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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>El Ranchito</h1>

      <div style={styles.switchContainer}>
        <span style={styles.label}>automatic</span>
        <div
          style={{
            ...styles.switch,
            backgroundColor: automatic ? "#2ecc71" : "#444",
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
            backgroundColor:
              percentage < 20 ? "#ff4d4d" : isFilling ? "#00ccff" : "#00bfff",
          }}
        >
          <span style={styles.percentageText}>
            {percentage}% {isFilling && "⚡"}
          </span>
        </div>
      </div>

      <div style={styles.navbar}>
        <div style={styles.navItem} />
        <div
          style={{
            ...styles.fab,
            backgroundColor: isFilling ? "#444" : "#00bfff",
            cursor: isFilling ? "default" : "pointer",
          }}
          onClick={() => !isFilling && startFilling()}
        >
          {isFilling ? "⏳" : "+"}
        </div>
        <div style={styles.navItem} />
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";

const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    boxSizing: "border-box",
    overflow: "hidden",
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
    fontSize: "16px",
    color: "#fff",
    fontWeight: "bold",
    position: "absolute",
    top: "10px",
    width: "100%",
    textAlign: "center",
  },
  navbar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#111",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    width: "40px",
    height: "40px",
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
    transition: "all 0.3s",
  },
};
