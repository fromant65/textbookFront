import { useState, useEffect } from "react";
import "./index.css";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, [isLogged]);
  useEffect(() => {
    fetch("http://localhost:3500/login", { credentials: "include" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.loggedIn) setIsLogged(true);
      });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route to="/config">Config</Route>
      <Route to="/profile">Config</Route>
      <Route to="/search">Config</Route>
      <Route to="/chat">Config</Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
