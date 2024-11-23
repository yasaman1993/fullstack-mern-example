import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fullstack-mern-example-79tt.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
         
        }
      );

      console.log("Response status:", response.status);
      console.log("Response body:", await response.text());
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed.");
    }
  }

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
}
