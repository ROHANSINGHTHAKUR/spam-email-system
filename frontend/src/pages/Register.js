import React, { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function Register({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(`${API}/auth/register`, {
        email,
        password,
      });

      alert("Registered successfully");
      setPage("login");
    } catch (err) {
      alert(err.response?.data?.detail || "Register failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setPage("login")}
      >
        Already have account? Login
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

export default Register;