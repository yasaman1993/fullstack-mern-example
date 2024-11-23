import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Report from "./components/Report.jsx";
import "../src/App.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./components/Login.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/reports" element={<Report />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
