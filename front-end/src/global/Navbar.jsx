import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
 
export default function Navbar() {
  return (
    <nav className="navbar-main">
      <div>
        <a href="/">
          <img
            src={require("./nordic.png")}
            alt="Nordic Automation"
            className="logo-image"
          />
        </a>
      </div>
      <div className="link-box">
        <a className="aref" href="/form">
          <AccountTreeIcon style={{ color: "#D9DFE9" }} /> Submit Process
        </a>
        <a className="aref" href="/dashboard">
          <DashboardIcon style={{ color: "#D9DFE9" }} />
          Dashboard
        </a>
        <div className="icon-box" href="/dashboard">
          <GitHubIcon fontSize="medium" />
          <LiveHelpIcon fontSize="medium" />
          <Link to="/login">
            <AdminPanelSettingsIcon fontSize="medium" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
 