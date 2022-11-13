import React, { useEffect } from "react";
import "../css/Home.css";
import Navbar from "../components/Navbar";
import MakePost from "../components/MakePost";
import { getUsername } from "../getUsername";

const Home = () => {
  useEffect(() => {
    fetch("http://localhost:3500/login", { credentials: "include" });
  }, []);
  return (
    <>
      <Navbar />
      <div className="page-home">
        <MakePost />
      </div>
    </>
  );
};

export default Home;
