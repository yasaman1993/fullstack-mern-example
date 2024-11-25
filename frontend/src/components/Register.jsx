import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    // Validate email and password
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(
        "https://fullstack-mern-example-79tt.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Registration failed.");
        return;
      }

      // Indicate email verification is required
      setIsVerifying(true);
      setMessage(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration failed.");
    }
  }

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h1>Register</h1>
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
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}
