import React from "react";
import "../css/NotFound.css";

const NotFound = () => {
  return (
    <section className="not-found-container">
      <h1 className="not-found-title">
        Parece que la página que buscabas no está disponible...
      </h1>
      <a className="not-found-link" href="/">
        Volver a la página de inicio
      </a>
    </section>
  );
};

export default NotFound;
