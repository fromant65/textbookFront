import { useState, useEffect } from "react";
import "./index.css";
import React from "react";
import Root from "./pages/Root";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import RestorePassword from "./pages/RestorePassword";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Config from "./pages/Config";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import { Routes, Route, useNavigate } from "react-router-dom";

export const serverLink = "http://localhost:3500";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      isLogged &&
      (window.location.pathname === "/" ||
        window.location.pathname === "/login" ||
        window.location.pathname === "/register")
    ) {
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
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/restore-password" element={<RestorePassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/config" element={<Config />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
