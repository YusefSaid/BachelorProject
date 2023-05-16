import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./global/Navbar";
import Chatbot from "./global/Chatbot";
import LoginPage from "./login/LoginPage";
import Home from "./home";
import Form from "./form";
import Dashboard from "./dashboard";
import AddUser from "./login/AddUser";
 
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
 
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <Chatbot />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/adduser" element={<AddUser />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}
 
export default App;