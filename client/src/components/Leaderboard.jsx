import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/Theme";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  const { theme, colors } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    fetch("http://localhost:5000/leaderboard")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const accentColor = isDark ? "#a0f1bd" : "#2E4F21"; // Mint vs Dark Green
  const winnerBg = isDark ? "#0f1c0b" : "#f0fdf4"; // Deep Green vs Pale Green
  const borderColor = isDark ? "#333" : "#eee";

  const styles = {
    container: {
      padding: "40px",
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "'Inter', sans-serif",
      color: colors.text,
    },
    title: {
      textAlign: "center",
      color: accentColor,
      marginBottom: "30px",
      fontSize: "32px",
    },
    card: {
      background: colors.cardBg,
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      overflow: "hidden",
      border: isDark ? "1px solid #333" : "none", // Subtle border for dark mode
    },
    headerRow: {
      display: "flex",
      background: "#2E4F21", // Keep header green for branding
      color: "#fff",
      padding: "15px 20px",
      fontWeight: "bold",
    },
    row: {
      display: "flex",
      padding: "15px 20px",
      borderBottom: `1px solid ${borderColor}`,
      alignItems: "center",
      transition: "background 0.2s",
    },
    rank: {
      width: "10%",
      fontWeight: "bold",
      color: isDark ? "#aaa" : "#888",
    },
    name: {
      flex: 1,
      fontWeight: "600",
      color: colors.text,
    },
    streak: {
      width: "15%",
      textAlign: "center",
    },
    xp: {
      width: "20%",
      textAlign: "right",
      fontWeight: "bold",
      color: accentColor,
    },
    medal: { marginRight: "5px" },
  };

  const getRankIcon = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏆 Top Learners</h1>

      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div style={{ width: "10%" }}>Rank</div>
          <div style={{ flex: 1 }}>Student</div>
          <div style={{ width: "15%", textAlign: "center" }}>Streak</div>
          <div style={{ width: "20%", textAlign: "right" }}>Total XP</div>
        </div>

        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              style={{
                ...styles.row,
                background: index === 0 ? winnerBg : colors.cardBg,
              }}
            >
              <div style={styles.rank}>{getRankIcon(index)}</div>
              <div style={styles.name}>
                {user.full_name}
                {index === 0 && (
                  <span
                    style={{
                      fontSize: "12px",
                      marginLeft: "8px",
                      background: "#FFD700",
                      padding: "2px 6px",
                      borderRadius: "10px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Leader
                  </span>
                )}
              </div>
              <div style={styles.streak}>
                {user.current_streak > 0 ? `🔥 ${user.current_streak}` : "-"}
              </div>
              <div style={styles.xp}>{user.xp_points} XP</div>
            </div>
          ))
        ) : (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: isDark ? "#aaa" : "#666",
            }}
          >
            Loading leaderboard...
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
