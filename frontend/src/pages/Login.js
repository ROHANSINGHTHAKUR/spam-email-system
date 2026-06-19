import React, { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function Login({ setPage, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      onLogin(res.data.access_token);
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setPage("register")}
      >
        New user? Register here
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "100px auto",
    gap: "10px",
  },
};

export default Login;