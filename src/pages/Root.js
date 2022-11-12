import React from "react";
import { Link } from "react-router-dom";
import "../css/Root.css";

const Root = () => {
  return (
    <div className="page">
      <div className="card">
        <h1 className="titulo">Bienvenido a Textbook</h1>
        <div className="links">
          <Link className="link" to="/login">
            Ir a login
          </Link>
          <Link className="link" to="/register">
            Ir a register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Root;
