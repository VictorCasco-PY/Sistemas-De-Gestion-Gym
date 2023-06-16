import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../assets/logo.png";
import "../login.css";

const Login = () => {
  const [usuario, setUsuario] = useState({
    user: "",
    password: "",
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/auth", usuario)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/listaClientes");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Usuario no encontrado",
          text: "Revise su nombre de usuario o contraseña",
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={Logo} alt="Logo de la aplicación" className="logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="user"
              value={usuario.user}
              className="form-control"
              type="text"
              placeholder="Nombre de Usuario"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              value={usuario.password}
              className="form-control"
              type={mostrarPassword ? "text" : "password"}
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                onChange={toggleMostrarPassword}
                checked={mostrarPassword}
              />{" "}
              Mostrar contraseña
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="login-button button is-primary is-outlined">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
