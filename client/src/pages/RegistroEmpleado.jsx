import React, { useState } from "react";
import axios from "axios"


const RegistroEmpleado = () => {
  //estado para manejar los valores de los inputs
  const [empleados, setEmpleados] = useState({
    user: "",
    password: "",
    str_nombre: "",
    str_telefono: "",
    str_direccion: "",
    str_cedula: "",
    time_inicio_trabajo: "",
    time_fin_trabajo: "",
    rol: "",
  });

  //estado para manejar el despliegue de un input
  const [mostrarInputTexto, setMostrarInputTexto] = useState(false);
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
    setMostrarInputTexto(event.target.value === "entrenador");
  };

  // función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = `${empleados.str_cedula}@gforce.com`;
    const newPassword = `${empleados.rol}${empleados.str_cedula}`;
    const empleadoData = { ...empleados, user: newUser, password: newPassword };
    console.log(empleadoData);
    axios.post('http://localhost:8000/empleados', empleadoData)
    .then(response => {
      console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  
  return (
    <div className="columns is-centered">
      <div className="column is-three-fifths-desktop">
        <div className="box">
          <form onSubmit={handleSubmit}>
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
            {mostrarInputTexto && (
              <div className="columns">
                <div className="column">
                  <input
                    className="input is-primary has-text-centered"
                    type="text"
                    placeholder="Especialidad"
                    required
                  />
                </div>
              </div>
            )}
            <div className="buttons">
              <button
                className="ml-auto mt-2 button is-primary is-outlined"
                type="submit"
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
