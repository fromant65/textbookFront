import React from "react";
import Navbar from "../components/Navbar";
import "../css/Navbar.css";
import ChangePassword from "../components/ChangePassword";
import ChangeUserInfo from "../components/ChangeUserInfo";

const Config = () => {
  return (
    <>
      <Navbar />
      <section className="page-config">
        <ChangePassword />
        <ChangeUserInfo />
      </section>
    </>
  );
};

export default Config;
