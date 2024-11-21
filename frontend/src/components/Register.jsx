import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

   function submitHandler(e) {
    e.preventDefault();

    fetch("https://fullstack-mern-example-79tt.onrender.com/register", {
      method: "POST", // HTTP-Methode
      headers: {
        "Content-Type": "application/json", // Header that specifies the content type
      },
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("registration failed");
        }
        setMessage("Please check your inbox and confirm your email.");
        setEmail("");
        setPassword("");
      })

      .catch((error) => setMessage("Please check your data", error));
  }

  return (
    <>
      <h2>Create an account</h2>
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

        <button type="submit">Sign up</button>
      </form>
      <p>{message}</p>
      <Link
        to="/login"
        style={{ display: "block", marginTop: "16px", color: "blue" }}>
        Go to login
      </Link>
    </>
  );
}
