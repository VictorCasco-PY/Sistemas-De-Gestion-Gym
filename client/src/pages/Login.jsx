import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
        navigate("/home");
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
    <div className="columns is-flex is-justify-content-center is-align-items-center mt-6">
      <div className="column is-one-third mt-6">
        <div className="box has-shadow mt-6">
          <h3 className="has-text-centered mb-2 title is-3 has-text-primary">
            Iniciar Sesión
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <p className="control">
                <input
                  name="user"
                  value={usuario.user}
                  className="input is-primary has-text-centered"
                  type="text"
                  placeholder="Nombre de Usuario"
                  onChange={handleChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input
                  name="password"
                  value={usuario.password}
                  className="input is-primary has-text-centered"
                  type={mostrarPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    onChange={toggleMostrarPassword}
                    checked={mostrarPassword}
                  />{" "}
                  Mostrar contraseña
                </label>
              </p>
            </div>
            <div className="buttons">
              <button
                type="submit"
                className="m-auto button is-primary is-outlined"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
