import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app, you would decode the token to get the user name.
      // For now, we just assume if there is a token, they are logged in.
      setUser({ name: "User" });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ name: "User" }); // Update state to trigger UI changes
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
