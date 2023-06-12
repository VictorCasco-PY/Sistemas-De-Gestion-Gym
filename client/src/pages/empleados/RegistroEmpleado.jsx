import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from "../../services/api";


const RegistroEmpleado = () => {
  //estado para manejar los valores de los inputs
  const empleadosData = {
    user: "",
    password: "",
    str_nombre: "",
    str_telefono: "",
    str_direccion: "",
    str_cedula: "",
    time_inicio_trabajo: "",
    time_fin_trabajo: "",
    rol: "",
  }
  const [empleados, setEmpleados] = useState(empleadosData);

  //estado para manejar los valores de los inputs tipo radio
  const [radioSeleccionado, setRadioSeleccionado] = useState("");

  //setea los valores del estado empleados con los datos ingresados por el usuario
  const handleChange = (event) => {
    setEmpleados({
      ...empleados,
      [event.target.name]: event.target.value,
    });
  };
  //setea los valores de los inputs tipo radio con el seleccionado por el usuario
  const handleRadioChange = (event) => {
    setRadioSeleccionado(event.target.value);
    setEmpleados({
      ...empleados,
      rol: event.target.value,
    });
  };

  // función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(empleados);

    // Validación de que time_inicio_trabajo no sea posterior a time_fin_trabajo
    if (empleados.time_inicio_trabajo >= empleados.time_fin_trabajo) {
      Swal.fire({
        icon: "error",
        title: "Error en la validación",
        text: "La hora de inicio de trabajo debe ser anterior a la hora de fin de trabajo",
      });
      return; // Detener el envío del formulario si la validación no pasa
    }
    api
      .post("empleados", empleados)
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Usuario registrado con éxito",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
        setEmpleados(empleadosData); // Restablecer el estado a su valor inicial
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error al registrar el usuario",
          text: "Por favor, verifica los datos e intenta nuevamente",
        });
      });
  };




  return (
    <div className="is-flex columns is-centered">
      <div className="column is-half">
        <div className="box">
          <form >
            <div className="column">
              <Link to={`/listaEmpleados`}>
                <button className="button is-link is-outlined">
                  <ArrowBackIcon fontSize="string" />
                </button>
              </Link>
            </div>
            <center>
              <h1 className="mb-2 title is-3 has-text-primary">
                Registrar Empleado
              </h1>
            </center>
            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="user"
                  value={empleados.user}
                  onChange={handleChange}
                  placeholder="Usuario"
                  required
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="password"
                  name="password"
                  value={empleados.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  required
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="str_nombre"
                  value={empleados.str_nombre}
                  onChange={handleChange}
                  placeholder="Nombres Y Apellidos"
                  required
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="str_cedula"
                  value={empleados.str_cedula}
                  onChange={handleChange}
                  placeholder="Cédula"
                  required
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="str_telefono"
                  value={empleados.str_telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  required
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="str_direccion"
                  value={empleados.str_direccion}
                  onChange={handleChange}
                  placeholder="Dirección"
                  required
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <label>Hora de Inicio</label>
              </div>
              <div className="column">
                <label>Hora de Fin</label>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary"
                  type="time"
                  name="time_inicio_trabajo"
                  value={empleados.time_inicio_trabajo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary"
                  type="time"
                  name="time_fin_trabajo"
                  value={empleados.time_fin_trabajo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <span>Rol: </span>
                <label className="radio">
                  <input
                    type="radio"
                    name="str_rol"
                    value="admin"
                    checked={radioSeleccionado === "admin"}
                    onChange={handleRadioChange}
                  />
                  Administrador
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="str_rol"
                    value="caja"
                    checked={radioSeleccionado === "caja"}
                    onChange={handleRadioChange}
                  />
                  Cajero
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="str_rol"
                    value="entrenador"
                    checked={radioSeleccionado === "entrenador"}
                    onChange={handleRadioChange}
                  />
                  Entrenador
                </label>
              </div>
            </div>
            <div className="buttons">
              <button
                onClick={handleSubmit}
                className="ml-auto mt-2 button is-primary is-outlined"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroEmpleado;
