import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  
  async function submitHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      
      setMessage("Please check your inbox and confirm your email.");
    } catch (error) {
      // Detailed error message if available
      setMessage(error.message || "Please check your data");
    }
  }

  return (
    <>
      <h2>Sign in to your account</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rememberMe">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            Remember me on this device
          </label>
        </div>

        <button type="submit">Sign in</button>
      </form>
      {message && <p>{message}</p>}
      <Link
        to="/login"
        style={{ display: "block", marginTop: "16px", color: "blue" }}>
        Go to login
      </Link>
    </>
  );
}
