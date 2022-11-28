import React, { useState } from "react";
import { serverLink } from "../App";
import "../css/RestorePassword.css";

const RestorePassword = () => {
  const [code, setCode] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [warning, setWarning] = useState("");
  const [isPassUpdated, setIsPassUpdated] = useState(null);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning("");
    if (!code || !newPass1 || !newPass2) {
      setWarning("Todos los campos deben ser completados");
      return;
    }
    if (newPass1 !== newPass2) {
      setWarning("Las contraseñas no coinciden");
      return;
    }
    const req = await fetch(`${serverLink}/update-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        password: newPass1,
      }),
    });
    const res = await req.json();
    if (res?.success) setIsPassUpdated(true);
    else {
      setIsPassUpdated(false);
      setError(res.message);
    }
  };
  return (
    <section className="res-pass-page">
      <h1 className="res-pass-title">Ingresa los siguientes datos</h1>
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="res-pass-form"
      >
        <input
          type="text"
          placeholder="Código recibido por email"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPass1}
          onChange={(e) => setNewPass1(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Nueva contraseña"
          value={newPass2}
          onChange={(e) => setNewPass2(e.target.value)}
        />
        <button type="submit">Cambiar contraseña</button>
      </form>
      <a href="/login" className="res-pass-return">
        ¿Ya recordaste tu contraseña? Logeate!
      </a>

      {isPassUpdated === null ? (
        ""
      ) : isPassUpdated ? (
        <div className="res-pass-success">
          La contraseña se actualizó correctamente
        </div>
      ) : (
        <div className="res-pass-error">
          Hubo un error al cambiar la contraseña: {error}
        </div>
      )}
      {warning && <div className="res-pass-warning">{warning}</div>}
    </section>
  );
};

export default RestorePassword;
