import React, { useState} from "react";

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
  });
  const handleChange = (event) => {
    setEmpleados({
      ...empleados,
      [event.target.name]: event.target.value,
    });
  };

  // función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(empleados);
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
            <div>
              <input
                className="input mb-2"
                type="email"
                name="user"
                value={empleados.user}
                placeholder="Corre Electronico"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="input mt-2"
                type="password"
                name="pass"
                value={empleados.pass}
                placeholder="Contraseña"
                onChange={handleChange}
              />
            </div>
                
              <div className="field">
                <div className="control">
                <span>Rol: </span>
                    <label className="radio">
                      <input type="radio" name="question" value="cajero"/>
                      Cajero
                    </label>
                    <label className="radio">
                      <input type="radio" name="question" value="entrenador" />
                      Entrenador
                    </label>
                </div>
            </div>
            <div className="columns">
              <div className="column">
                <input
                  className="input"
                  type="text"
                  name="str_nombre"
                  value={empleados.str_nombre}
                  onChange={handleChange}
                  placeholder="Nombres Y Apellidos"
                />
              </div>
              <div className="column">
                <input
                  className="input"
                  type="text"
                  name="str_telefono"
                  value={empleados.str_telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
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
                  className="input"
                  type="date"
                  name="time_inicio_trabajo"
                  value={empleados.time_inicio_trabajo}
                  onChange={handleChange}
                />
              </div>
              <div className="column">
                <input
                  className="input"
                  type="date"
                  name="time_fin_trabajo"
                  value={empleados.time_fin_trabajo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <input
                  className="input"
                  type="text"
                  name="str_cedula"
                  value={empleados.str_cedula}
                  onChange={handleChange}
                  placeholder="Cédula"
                />
              </div>
              <div className="column">
                <input
                  className="input"
                  type="text"
                  name="str_direccion"
                  value={empleados.str_direccion}
                  onChange={handleChange}
                  placeholder="Dirección"
                />
              </div>
            </div>
            <div className="buttons">
                <button className="ml-auto mt-2 button is-primary is-outlined" type="submit">
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
