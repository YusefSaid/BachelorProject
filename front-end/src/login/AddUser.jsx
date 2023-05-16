import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddUser.css";
 
async function createUser(username, password, firstname, lastname, token) {
  const response = await fetch("192.168.0.104:8000/admins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, password, firstname, lastname }),
  });
 
  if (!response.ok) {
    throw new Error("Error creating user");
  }
 
  const data = await response.json();
  return data;
}
 
function AddUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
 
    try {
      await createUser(username, password, firstname, lastname, token);
      // Show success message or navigate to another page
    } catch (err) {
      setError(err.message);
    }
  };
 
  const handlebackNavigation = () => {
    navigate("/Login");
  };
 
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
 
  return (
    <div className="add-user-page">
      <h1>Create New User</h1>
      <div className="add-user-form">
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <br />
          <label>
            Username:
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
 
          <button type="submit">Create User</button>
          <button onClick={handlebackNavigation}>Cancel</button>
        </form>
      </div>
      {error && <p>{error}</p>}
      {token && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}
 
export default AddUser;