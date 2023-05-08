import React, { useState } from "react";

const RegistroEmpleado = () => {
  const [empleados, setEmpleados] = useState({
    user: "",
    pass: "",
    str_nombre: "",
    time_inicio_trabajo: "",
    time_fin_trabajo: "",
    str_telefono: "",
    str_cedula: "",
    str_direccion: "",
    str_rol: "",
  });
  const [mostrarInputTexto, setMostrarInputTexto] = useState(false);
  const [radioSeleccionado, setRadioSeleccionado] = useState("");

  const handleChange = (event) => {
    setEmpleados({
      ...empleados,
      [event.target.name]: event.target.value,
    });
  };

  const handleRadioChange = (event) => {
    setRadioSeleccionado(event.target.value);
    setEmpleados({
      ...empleados,
      str_rol: event.target.value,
    });
    setMostrarInputTexto(event.target.value === "entrenador");
  };

  // función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(empleados);
  };

  /*const handleSubmit = (event) => {
  event.preventDefault();
  axios.post('URL_DEL_ENDPOINT', empleados)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};*/ 

  

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
            <div>
              <input
                className="input is-primary mb-2 has-text-centered"
                type="email"
                name="user"
                value={empleados.user}
                placeholder="Corre Electronico"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                className="input is-primary mt-2 has-text-centered"
                type="password"
                name="pass"
                value={empleados.pass}
                placeholder="Contraseña"
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <div className="control">
                <span>Rol: </span>
                <label className="radio">
                  <input
                    type="radio"
                    name="str_rol"
                    value="cajero"
                    checked={radioSeleccionado === "cajero"}
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
                  name="str_telefono"
                  value={empleados.str_telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  required
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <label>Fecha de Inicio</label>
              </div>
              <div className="column">
                <label>Fecha de Fin</label>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary"
                  type="date"
                  name="time_inicio_trabajo"
                  value={empleados.time_inicio_trabajo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary"
                  type="date"
                  name="time_fin_trabajo"
                  value={empleados.time_fin_trabajo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="columns">
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
