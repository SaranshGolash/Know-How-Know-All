import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // LAZY INITIALIZATION
  // We pass a function to useState. This runs BEFORE the first render.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      // If data exists, parse and use it IMMEDIATELY
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch (e) {
      console.error("Corrupt data found in storage");
      return null;
    }
  });

  // We still keep the token separate if needed, but usually user data is enough for UI
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  // Login Function
  const login = (newToken, userData) => {
    // Update LocalStorage
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    // Update State (UI updates instantly)
    setToken(newToken);
    setUser(userData);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
