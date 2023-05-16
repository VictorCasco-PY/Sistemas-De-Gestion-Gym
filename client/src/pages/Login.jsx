import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const [usuario, setUsuario] = useState({
    user: "",
    password: "",
  });

  //const { userData, setUserData } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8000/auth", usuario)
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

  return (
    <div className="columns is-centered">
      <div className="column is-three-fifths-desktop">
        <div className="box mt-5 has-shadow">
          <h3 className="has-text-centered mb-2 title is-3 has-text-primary">
            Iniciar Sesión
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  name="user"
                  value={usuario.user}
                  className="input is-primary has-text-centered"
                  type="text"
                  placeholder="Correo Electronico"
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  name="password"
                  value={usuario.password}
                  className="input is-primary has-text-centered"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
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
