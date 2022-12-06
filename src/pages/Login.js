import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { serverLink } from "../App";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    const location = `${serverLink}/login`;
    const req = await fetch(location, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    });
    const res = await req.json();
    console.log(res);
    if (res.message) {
      setLoginStatus(res.message);
    } else {
      setIsLogged(res.login);
    }
  };
  //Redireccionamos una vez que se logea el usuario
  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    } else {
      fetch(`${serverLink}/login`, { credentials: "include" })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.loggedIn) setIsLogged(true);
        });
    }
  }, [isLogged]);
  return (
    <div className="page-login">
      <div className="container form-container">
        <h2 className="titulo">Iniciar sesión</h2>
        <form
          id="login"
          action="login"
          method="post"
          onSubmit={(e) => {
            loginHandler(e);
          }}
        >
          <div className="user-div">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="pwd-div">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="submit">
            <button id="submit" type="submit">
              Ingresar
            </button>
          </div>
          <div className="forget-pwd">
            <Link to="/forgot-password">¿Has olvidado la contraseña?</Link>
          </div>
        </form>
        <p className="register-redirect">
          ¿Aún no tienes una cuenta? <Link to="/register">¡Registrate!</Link>
        </p>
      </div>
      <div className="login-error">{loginStatus}</div>
    </div>
  );
};

export default Login;
