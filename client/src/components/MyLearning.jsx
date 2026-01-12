import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MyLearning() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/user/purchases/${user.id}`)
        .then((res) => res.json())
        .then((data) => setCourses(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const styles = {
    container: { padding: "80px 40px", maxWidth: "1280px", margin: "0 auto" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "30px",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "16px",
      border: "1px solid #e0e0e0",
      transition: "transform 0.2s",
      cursor: "pointer",
    },
    title: { color: "#2E4F21", fontWeight: "700", marginBottom: "10px" },
    btn: {
      marginTop: "15px",
      width: "100%",
      padding: "12px",
      background: "#2E4F21",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#2E4F21", marginBottom: "40px" }}>
        My Learning Dashboard
      </h1>

      {courses.length === 0 ? (
        <p>You haven't purchased any courses yet.</p>
      ) : (
        <div style={styles.grid}>
          {courses.map((course) => (
            <div key={course.purchase_id} style={styles.card}>
              <h3 style={styles.title}>{course.course_title}</h3>
              <p>Status: {course.payment_status}</p>
              <button
                style={styles.btn}
                onClick={() =>
                  navigate("/ai-teacher", { state: { course: course } })
                }
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
