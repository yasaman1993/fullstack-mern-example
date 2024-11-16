import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Welcome</h1>
      <div className="link-container">
        <Link to="/register" className="link">Register</Link>
        <Link to="/login" className="link">Login</Link>
      </div>
    </div>
  );
}