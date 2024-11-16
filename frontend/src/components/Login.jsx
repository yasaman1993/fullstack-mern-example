import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);

  function submitHandler(e) {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed.");
        }

        return res.json();
      })
      .then((data) => {
        if (data.token) {
          login(data.token);
          setEmail("");
          setPassword("");
          setMessage("Login successful!");
        }
      })
      .catch((error) =>
        setMessage("An error occurred. Please try again.", error)
      );
  }

  return (
    <>
      <h1>login to your account</h1>
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

        <button type="submit">login</button>
      </form>
      {message && <p>{message}</p>}
      <Link
        to="/"
        style={{ display: "block", marginTop: "16px", color: "blue" }}>
        Go to back
      </Link>
    </>
  );
}
