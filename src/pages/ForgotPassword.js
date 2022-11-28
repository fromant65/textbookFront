import React, { useState } from "react";
import { serverLink } from "../App";
import "../css/ForgotPassword.css";
const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const req = await fetch(`${serverLink}/forgot-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    const res = await req.json();
    console.log(res);
    if (res?.success) {
      setIsMailSent(true);
      setIsError(false);
    } else {
      setIsError(true);
      setIsMailSent(false);
    }
  };
  return (
    <section className="for-pass-page">
      <h1 className="for-pass-title">¿Haz olvidado tu contraseña?</h1>
      <div className="for-pass-text">
        Ingresa debajo tu nombre de usuario y enviaremos un link al mail
        asociado a la cuenta para que puedas recuperar la contraseña
      </div>
      <form
        action=""
        onSubmit={(e) => handlePasswordChange(e)}
        className="for-pass-form"
      >
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Recuperar contraseña</button>
      </form>
      <a href="/login" className="for-pass-return">
        ¿Ya recordaste tu contraseña? Logeate!
      </a>
      {isMailSent && (
        <div className="for-pass-success">
          Se ha enviado correctamente el mail
        </div>
      )}
      {isError && (
        <div className="for-pass-error">
          Ha ocurrido un error al enviar el mail. Intenta nuevamente
        </div>
      )}
    </section>
  );
};

export default ForgotPassword;
