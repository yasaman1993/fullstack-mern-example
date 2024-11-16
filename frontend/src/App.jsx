import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import "./App.css";
import Login from "./components/Login";
import { AuthProvider } from "../context/AuthProvider.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
