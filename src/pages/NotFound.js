import React, { useEffect, useState } from "react";
import { serverLink } from "../App";
import "../css/NotFound.css";

const NotFound = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    fetch(`${serverLink}/login`, { credentials: "include" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.loggedIn) setIsLogged(true);
      });
  }, [isLogged]);
  return (
    <section className="not-found-container">
      <h1 className="not-found-title">
        Parece que la página que buscabas no está disponible...
      </h1>
      <a className="not-found-link" href={isLogged ? "/home" : "/"}>
        Volver a la página de inicio
      </a>
    </section>
  );
};

export default NotFound;
