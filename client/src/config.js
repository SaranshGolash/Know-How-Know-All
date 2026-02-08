// Default to local server when REACT_APP_API_URL is not set (e.g. npm start)
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
export const WS_URL =
  process.env.REACT_APP_WS_URL ||
  (API_URL ? API_URL.replace(/^http/, "ws") : "ws://localhost:5000");
