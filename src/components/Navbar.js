import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import { BiBook, BiExit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsGear } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const location = "http://localhost:3500/logout";
    const req = await fetch(location, { credentials: "include" });
    const res = await req.json();
    if (res.logout) navigate("/");
  };
  const iconValue = {
    size: "20",
    style: {
      paddingRight: "5px",
      color: "rgb(100, 160, 210)",
    },
  };
  return (
    <>
      <nav className="navbar">
        <div className="home navitem">
          <Link className="Link" to="/home">
            <IconContext.Provider value={iconValue}>
              <BiBook />
            </IconContext.Provider>
            <p>Textbook</p>
          </Link>
        </div>
        <div className="profile navitem">
          <Link className="Link" to="/profile">
            <IconContext.Provider value={iconValue}>
              <CgProfile />
            </IconContext.Provider>
            <p>Profile</p>
          </Link>
        </div>
        <div className="config navitem">
          <Link className="Link" to="/config">
            <IconContext.Provider value={iconValue}>
              <BsGear />
            </IconContext.Provider>
            <p>Config</p>
          </Link>
        </div>
        <div className="logout navitem Link" onClick={logoutHandler}>
          <IconContext.Provider value={iconValue}>
            <BiExit />
          </IconContext.Provider>
          <p>Logout</p>
        </div>
      </nav>
      <div className="navbar-filler"></div>
    </>
  );
};

export default Navbar;
