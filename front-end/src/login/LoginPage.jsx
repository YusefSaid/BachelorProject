import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
 
async function login(username, password) {}
 
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");
    if (accessToken && storedUsername) {
      setUsername(storedUsername);
      setLoggedIn(true);
    }
  }, []);
 
  const handleNaviation = () => {
    navigate("/AddUser");
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
 
    try {
      const accessToken = await login(username, password);
 
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
 
      //navigate("/AddUser");
      window.location.reload();
    } catch (err) {
      setError("Incorrect username or password");
    }
  };
 
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setUsername("");
    setLoggedIn(false);
  };
 
  return (
    <div className="login-page">
      <h1>Login Page</h1>
      {loggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleNaviation}>Add User</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
 
export default LoginPage;