import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import { BiBook, BiExit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsGear, BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { serverLink } from "../App";

const Navbar = () => {
  const [userQuery, setUserQuery] = useState("");
  const [queryResult, setQueryResult] = useState([]);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const location = `${serverLink}/logout`;
    const req = await fetch(location, { credentials: "include" });
    const res = await req.json();
    if (res.logout) navigate("/");
  };

  useEffect(() => {
    const handleSearch = async (e) => {
      const req = await fetch(`${serverLink}/search-user/${userQuery}`);
      const res = await req.json();
      setQueryResult(res);
      if (res.length) {
        document
          .querySelector(".search-results")
          .classList.remove("results-not-available");
      } else {
        document
          .querySelector(".search-results")
          .classList.add("results-not-available");
      }
    };
    handleSearch();
  }, [userQuery]);

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
          <a className="Link" href="/home">
            <IconContext.Provider value={iconValue}>
              <BiBook />
            </IconContext.Provider>
            <p>Textbook</p>
          </a>
        </div>
        <div className="profile navitem">
          <a className="Link" href="/profile">
            <IconContext.Provider value={iconValue}>
              <CgProfile />
            </IconContext.Provider>
            <p>Profile</p>
          </a>
        </div>
        <div className="config navitem">
          <a className="Link" href="/config">
            <IconContext.Provider value={iconValue}>
              <BsGear />
            </IconContext.Provider>
            <p>Config</p>
          </a>
        </div>
        <div className="search">
          <a href="/search" className="Link">
            <IconContext.Provider value={iconValue}>
              <BsSearch />
            </IconContext.Provider>
          </a>
          <div className="search-input">
            <input
              type="text"
              placeholder="Buscar por username"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            />
          </div>
          <div className="search-results results-not-available">
            {queryResult.map((user) => {
              return (
                <a
                  className="search-result"
                  key={user.username}
                  href={`/profile/${user.username}`}
                >
                  {user.username}
                </a>
              );
            })}
          </div>
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
