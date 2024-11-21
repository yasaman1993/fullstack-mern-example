import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);

  function submitHandler(e) {
    e.preventDefault();

    fetch("https://fullstack-mern-example-79tt.onrender.com/login", {
      method: "POST",
      credentials: "include", // Sendet Cookies (z. B. für JWT)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        setEmail("");
        setPassword("");
        setMessage("Login successful!");
        login();
      })
      .catch((error) =>
        setMessage("An error occurred. Please try again.", error)
      );
  }

  return (
    <>
      <h1>login to your account</h1>
      <p>{message}</p>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">login</button>
      </form>
    </>
  );
}
