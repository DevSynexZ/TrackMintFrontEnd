import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PiggyContext } from "../../context/PiggyContext";
import { signup, Login as loginUser } from "../../services/authService";
import logo from "../../assets/track.png";
export default function Login() {
  const { setCurrentUser, setToken } = useContext(PiggyContext);

  const [name, setName] = useState(""); // for registration
  const [username, setUsername] = useState(""); // for registration
  const [email, setEmail] = useState(""); // for login & registration
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setMessage("");

      if (!email || !password) {
        setMessage("Email & password required");
        return;
      }

      let data;

      if (name && username) {
        data = await signup({ fullName: name, username, email, password });
      } else {
        data = await loginUser({ email, password });
      }

      setToken(data.data.token);
      setCurrentUser(data.data.user);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div id="loginPage">
      <img src={logo} alt="logo" />
      <h1>Track-Mint</h1>

      <input
        type="text"
        placeholder="Full Name (first time only)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username (first time only)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
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

      {message && <div className="message">{message}</div>}

      <button className="primaryBtn" onClick={handleLogin}>
        Login / Register
      </button>
    </div>
  );
}
