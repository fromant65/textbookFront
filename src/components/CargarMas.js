import React from "react";

const CargarMas = ({ lastPost, cargarMas, isCargando }) => {
  return (
    <>
      <button
        onClick={() => {
          cargarMas(lastPost);
        }}
        id="cargar-mas"
      >
        {lastPost <= 1 ? "No hay mas posts" : "Cargar más"}
        <div id="cargar-mas-spinner" className="cargando-hidden"></div>
      </button>
    </>
  );
};

export default CargarMas;
