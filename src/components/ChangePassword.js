import React, { useState } from "react";
import { serverLink } from "../App";
import "../css/ChangePassword.css";

const ChangePassword = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");
  const [changePasswordAlert, setChangePasswordAlert] = useState("");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currPassword || !newPassword || !confNewPassword) {
      setChangePasswordAlert("Se deben ingresar todos los datos");
      setChangePasswordSuccess("");
      return;
    }
    if (newPassword !== confNewPassword) {
      setChangePasswordAlert("Las contraseñas no coinciden");
      setChangePasswordSuccess("");
      return;
    }
    if (newPassword === currPassword) {
      setChangePasswordAlert(
        "La nueva y antigua contraseña deben ser distintas"
      );
      setChangePasswordSuccess("");
      return;
    }
    const req = await fetch(`${serverLink}/config/check-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: currPassword,
      }),
      credentials: "include",
    });
    const res = await req.json();
    if (res.res === false) {
      setChangePasswordAlert(
        "La contraseña ingresada no coincide con la de la cuenta"
      );
      setChangePasswordSuccess("");
      return;
    }
    if (res.res === true && newPassword === confNewPassword) {
      //Update password
      const req = await fetch(`${serverLink}/config/update-password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
        }),
        credentials: "include",
      });
      const res = await req.json();
      //console.log(res);
      if (res.success) {
        setChangePasswordSuccess(
          "Se ha modificado la contraseña correctamente"
        );
        setChangePasswordAlert("");
      } else {
        setChangePasswordAlert(
          "Ha ocurrido un error al modificar la contraseña"
        );
        setChangePasswordSuccess("");
      }
    }
  };

  return (
    <article className="change-password-container">
      <h2>Cambiar contraseña</h2>
      <form action="" method="post" onSubmit={(e) => handlePasswordChange(e)}>
        <input
          type="password"
          placeholder="Introduzca contraseña actual"
          value={currPassword}
          onChange={(e) => setCurrPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Introduzca nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirme su nueva contraseña"
          value={confNewPassword}
          onChange={(e) => setConfNewPassword(e.target.value)}
        />
        <button type="submit">Confirmar cambios</button>
        <div className="change-password-alert">{changePasswordAlert}</div>
        <div className="change-password-success">{changePasswordSuccess}</div>
      </form>
    </article>
  );
};

export default ChangePassword;
