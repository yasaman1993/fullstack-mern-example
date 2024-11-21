import "./App.css";
import Login from "./components/Login";
import Report from "./components/Report";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");

  // Check if user is still authenticated
  useEffect(() => {
    fetch("https://fullstack-mern-example-79tt.onrender.com/auth/check", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true); // Token is valid
        } else {
          setIsAuthenticated(false); // Token is invalid or expired
        }
      })
      .catch(() => setIsAuthenticated(false)); // Handle fetch errors
  }, []);

  // Set user as authenticated
  const login = () => {
    setIsAuthenticated(true);
  };

  // Logout the user
  const logout = () => {
    fetch("https://fullstack-mern-example-79tt.onrender.com/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setIsAuthenticated(false);
      })
      .catch(() => setMessage("Error logging out. Please try again."));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {isAuthenticated ? (
        <>
          <button onClick={logout}>Logout</button>
          <Report />
        </>
      ) : (
        <Login />
      )}
      {message && <p style={{ color: "red" }}>{message}</p>}
    </AuthContext.Provider>
  );
}

export default App;
