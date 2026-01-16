import React from "react";
import Editor from "@monaco-editor/react";

function Whiteboard({ data }) {
  if (!data) return null;

  const styles = {
    board: {
      position: "absolute",
      top: "20px",
      right: "20px",
      width: "300px",
      background: "rgba(255, 255, 255, 0.95)", // Glassmorphism
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      zIndex: 20,
      animation: "fadeIn 0.5s ease",
      fontFamily: "'Inter', sans-serif",
      maxHeight: "60vh",
      overflowY: "auto",
    },
    title: {
      fontSize: "16px",
      fontWeight: "800",
      color: "#2E4F21",
      marginBottom: "10px",
      borderBottom: "2px solid #a0f1bd",
      paddingBottom: "5px",
      textTransform: "uppercase",
    },
    list: {
      paddingLeft: "20px",
      margin: 0,
      color: "#333",
      fontSize: "14px",
      lineHeight: "1.6",
    },
    codeBox: {
      marginTop: "10px",
      height: "150px",
      borderRadius: "8px",
      overflow: "hidden",
      border: "1px solid #ddd",
    },
  };

  return (
    <div style={styles.board}>
      <div style={styles.title}>{data.title}</div>

      {data.type === "list" ? (
        <ul style={styles.list}>
          {Array.isArray(data.content) ? (
            data.content.map((point, i) => <li key={i}>{point}</li>)
          ) : (
            <li>{data.content}</li>
          )}
        </ul>
      ) : (
        <div style={styles.codeBox}>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-light"
            value={data.content}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              lineNumbers: "off",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Whiteboard;
