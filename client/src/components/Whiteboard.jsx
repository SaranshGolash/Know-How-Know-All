import React from "react";
import Editor from "@monaco-editor/react";

function Whiteboard({ data, onClose }) {
  if (!data) return null;

  // SAFEGUARDS: Ensure content is never null/undefined
  const contentType = data.type || "list";
  const content = data.content || "";
  const title = data.title || "Notes";

  const styles = {
    board: {
      position: "absolute",
      top: "20px",
      right: "20px",
      width: "350px",
      background: "rgba(30, 30, 30, 0.95)", // Dark mode bg
      backdropFilter: "blur(12px)",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
      zIndex: 100, // Ensure it sits on top of everything
      fontFamily: "'Inter', sans-serif",
      maxHeight: "70vh",
      overflowY: "auto",
      border: "1px solid #444",
      animation: "slideIn 0.3s ease-out"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
        borderBottom: "1px solid #555",
        paddingBottom: "10px",
    },
    title: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#a0f1bd", // Mint Green
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    closeBtn: {
        background: "transparent",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "#888",
        lineHeight: 1,
        transition: "color 0.2s"
    },
    list: { 
        paddingLeft: "20px", 
        margin: 0, 
        color: "#ddd", 
        fontSize: "15px", 
        lineHeight: "1.6" 
    },
    listItem: {
        marginBottom: "8px"
    },
    codeBox: { 
        marginTop: "10px", 
        height: "200px", 
        borderRadius: "8px", 
        overflow: "hidden", 
        border: "1px solid #555" 
    }
  };

  return (
    <div style={styles.board} className="whiteboard-panel">
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.title}>{title}</div>
        <button 
            style={styles.closeBtn} 
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.color = "#fff"}
            onMouseLeave={(e) => e.target.style.color = "#888"}
        >
            &times;
        </button>
      </div>
      
      {/* Content Render Logic */}
      {contentType === "code" ? (
        <div style={styles.codeBox}>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            // ✅ CRITICAL FIX: Ensure value is always a string to prevent crash
            value={typeof content === "string" ? content : JSON.stringify(content, null, 2)}
            options={{ 
                readOnly: true, 
                minimap: { enabled: false }, 
                lineNumbers: "off",
                scrollBeyondLastLine: false,
                fontSize: 13
            }}
          />
        </div>
      ) : (
        <ul style={styles.list}>
          {/* ✅ CRITICAL FIX: Handle both Arrays and Strings safely */}
          {Array.isArray(content) ? (
            content.map((point, i) => (
                <li key={i} style={styles.listItem}>{point}</li>
            ))
          ) : (
            // If AI sends a single string instead of a list, handle it gracefully
            <li style={styles.listItem}>{String(content)}</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Whiteboard;