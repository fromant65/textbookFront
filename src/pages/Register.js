import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";
import { serverLink } from "../App";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    const location = `${serverLink}/register`;
    const req = await fetch(location, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        fullname: fullname,
      }),
    });
    const res = await req.json();
    const data = await res;
    //Si el response tiene un atributo success, entonces se pudo crear la cuenta
    if (data.success) setIsRegistered(true);
    //Si no, hubo un error y lo mostramos
    else {
      setIsRegistered(false);
      setRegisterMessage(data.message);
    }
  };
  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, [isLogged]);
  //Redireccionamos una vez que se logea el usuario
  useEffect(() => {
    if (isRegistered) {
      setRegisterMessage(
        "Te registraste correctamente. serás redireccionado pronto a la página de login."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isRegistered]);
  useEffect(() => {
    fetch(`${serverLink}/login`, { credentials: "include" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.loggedIn) setIsLogged(true);
      });
  }, []);

  return (
    <div className="page-register">
      <div className="container form-container">
        <h2 className="titulo">Ingresa tus datos para registrarte</h2>
        <form
          id="register"
          action="register"
          method="post"
          onSubmit={(e) => registerHandler(e)}
        >
          <div className="user-div">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              required
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
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="fullname-div">
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Nombre Completo"
              required
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
          </div>
          <div className="email-div">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="submit">
            <button id="submit" type="submit">
              Registrarse
            </button>
          </div>
        </form>
        <p className="login-redirect">
          ¿Ya tienes una cuenta? <Link to="/login">¡Logueate!</Link>
        </p>
      </div>
      <div className={`resultado ${isRegistered ? "exito" : "fracaso"} `}>
        {registerMessage}
      </div>
    </div>
  );
};

export default Register;
