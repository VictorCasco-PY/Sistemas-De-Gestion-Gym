import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      });
  };

  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };

  return (
    <div className="columns is-centered">
      <div className="column is-three-fifths-desktop">
        <div className="box mt-5 has-shadow">
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
                  placeholder="Correo Electrónico"
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
