import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ onClose, code, setCode }) {
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // Function to execute code via Piston API
  const runCode = async () => {
    setIsLoading(true);
    setOutput([]); // Clear previous output
    setError(null);

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "javascript",
          version: "18.15.0",
          files: [{ content: code }],
        }),
      });

      const data = await response.json();

      if (data.run) {
        // Capture stdout
        const outputLines = data.run.output ? data.run.output.split("\n") : [];
        setOutput(outputLines.length > 0 ? outputLines : ["(No output)"]);

        // Capture stderr as error
        if (data.run.stderr) {
            setError(data.run.stderr);
        }
      } else {
        setError("Execution failed: No response data");
      }
    } catch (err) {
      setError("API Error: " + err.message);
    } finally {
      setIsLoading(false);
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
          <button
            style={{ ...styles.runBtn, opacity: isLoading ? 0.7 : 1 }}
            onClick={runCode}
            disabled={isLoading}
          >
            {isLoading ? "⏳ Running..." : "▶ Run Code"}
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
