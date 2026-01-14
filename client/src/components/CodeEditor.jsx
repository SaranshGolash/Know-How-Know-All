import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ onClose }) {
  const [code, setCode] = useState(
    "// Write your JavaScript here\nconsole.log('Hello from the AI Class!');\n\nconst sum = (a, b) => a + b;\nconsole.log(sum(5, 10));"
  );
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);

  // Function to execute code safely in the browser
  const runCode = () => {
    setOutput([]); // Clear previous output
    setError(null);

    const logs = [];
    const originalLog = console.log;

    console.log = (...args) => {
      logs.push(args.map((arg) => JSON.stringify(arg)).join(" "));
      originalLog(...args); // Still log to real console
    };

    try {
      new Function(code)();
    } catch (err) {
      setError(err.toString());
    } finally {
      console.log = originalLog;
      if (logs.length > 0) setOutput(logs);
      else if (!error) setOutput(["(No output)"]);
    }
  };

  const styles = {
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "#1e1e1e",
    },
    toolbar: {
      padding: "10px",
      background: "#252526",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #333",
    },
    runBtn: {
      background: "#2E4F21",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    closeBtn: {
      background: "transparent",
      color: "#aaa",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
    },
    outputBox: {
      height: "150px",
      background: "#000",
      color: "#a0f1bd",
      padding: "10px",
      fontFamily: "monospace",
      overflowY: "auto",
      borderTop: "1px solid #333",
    },
    error: { color: "#ff6b6b", marginTop: "5px" },
  };

  return (
    <div style={styles.container}>
      {/* Toolbar */}
      <div style={styles.toolbar}>
        <span style={{ color: "#fff", fontWeight: "bold", fontSize: "14px" }}>
          JS Playground
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={styles.runBtn} onClick={runCode}>
            ▶ Run Code
          </button>
          <button style={styles.closeBtn} onClick={onClose}>
            ✖ Close
          </button>
        </div>
      </div>

      {/* The Editor */}
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
        options={{ minimap: { enabled: false }, fontSize: 14 }}
      />

      {/* The Console Output */}
      <div style={styles.outputBox}>
        <div style={{ color: "#666", marginBottom: "5px" }}>
          Console Output:
        </div>
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        {error && <div style={styles.error}>❌ {error}</div>}
      </div>
    </div>
  );
}

export default CodeEditor;
