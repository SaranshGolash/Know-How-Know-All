import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/Theme"; //
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function MyLearning() {
  const { user } = useContext(AuthContext);
  const { colors, theme } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const accentColor = isDark ? "#a0f1bd" : "#2E4F21";

  useEffect(() => {
    if (user?.id) {
      fetch(`${API_URL}/user/purchases/${user.id}`)
        .then((res) => res.json())
        .then((data) => setCourses(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const styles = {
    container: {
      padding: "80px 40px",
      maxWidth: "1280px",
      margin: "0 auto",
      color: colors.text,
    },
    heading: {
      color: accentColor,
      marginBottom: "40px",
      fontSize: "32px",
      fontWeight: "bold",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "30px",
    },
    card: {
      background: colors.cardBg,
      padding: "20px",
      borderRadius: "16px",
      border: isDark ? "1px solid #333" : "1px solid #e0e0e0",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      boxShadow: isDark
        ? "0 4px 20px rgba(0,0,0,0.3)"
        : "0 4px 15px rgba(0,0,0,0.05)",
    },
    courseTitle: {
      color: accentColor,
      fontWeight: "700",
      marginBottom: "10px",
      fontSize: "20px",
    },
    statusText: {
      color: isDark ? "#aaa" : "#666",
      marginBottom: "15px",
      fontSize: "14px",
    },
    btn: {
      marginTop: "15px",
      width: "100%",
      padding: "12px",
      background: "#2E4F21",
      color: "#fff",
      border: isDark ? "1px solid #a0f1bd" : "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background 0.2s",
    },
    emptyState: {
      fontSize: "18px",
      color: isDark ? "#ccc" : "#555",
      textAlign: "center",
      marginTop: "50px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Learning Dashboard</h1>

      {courses.length === 0 ? (
        <p style={styles.emptyState}>You haven't purchased any courses yet.</p>
      ) : (
        <div style={styles.grid}>
          {courses.map((course) => (
            <div
              key={course.purchase_id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 10px 25px rgba(0,0,0,0.5)"
                  : "0 10px 25px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 4px 20px rgba(0,0,0,0.3)"
                  : "0 4px 15px rgba(0,0,0,0.05)";
              }}
            >
              <h3 style={styles.courseTitle}>{course.course_title}</h3>
              <p style={styles.statusText}>Status: {course.payment_status}</p>

              <button
                style={styles.btn}
                onClick={() =>
                  navigate("/ai-teacher", { state: { course: course } })
                }
                onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                onMouseOut={(e) => (e.target.style.opacity = "1")}
              >
                Start Learning →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLearning;
