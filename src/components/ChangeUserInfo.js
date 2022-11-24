import React, { useState } from "react";
import { serverLink } from "../App";
import "../css/ChangeUserInfo.css";

const ChangeUserInfo = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleInfoUpdate = async (e) => {
    e.preventDefault();
    if (!password) {
      setAlertMessage("No se ha ingresado ninguna contraseña");
      setSuccessMessage("");
      return;
    }

    //Fetch current password sent and compare with account password on server
    const checkResponse = await fetch(`${serverLink}/config/check-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
      credentials: "include",
    });

    const dataCheck = await checkResponse.json();
    if (dataCheck.res === false) {
      setAlertMessage(
        "La contraseña ingresada no coincide con la de la cuenta"
      );
      setSuccessMessage("");
      return;
    }

    let newData = {};
    if (fullname) newData.newFullName = fullname;
    if (email) newData.newEmail = email;

    if (Object.keys(newData).length === 0) {
      setAlertMessage("No se hán ingresado datos a modificar");
      setSuccessMessage("");
      return;
    }

    const req = await fetch(`${serverLink}/config/update-user-data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
      credentials: "include",
    });
    const res = await req.json();
    //console.log(data);
    if (res.success) {
      setAlertMessage("");
      setSuccessMessage("Se han modificado los datos correctamente");
    } else {
      setAlertMessage(
        `Ha ocurrido un error al modificar la contraseña: ${res.error}`
      );
      setSuccessMessage("");
    }
  };

  return (
    <article className="change-user-info-container">
      <h2>Cambiar información de usuario</h2>
      <form action="" method="post" onSubmit={(e) => handleInfoUpdate(e)}>
        <input
          type="text"
          placeholder="Modificar nombre completo"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Modificar email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña para confirmar los cambios"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Confirmar cambios</button>
      </form>
      <div className="change-error-alert">{alertMessage}</div>
      <div className="success-alert">{successMessage}</div>
    </article>
  );
};

export default ChangeUserInfo;
