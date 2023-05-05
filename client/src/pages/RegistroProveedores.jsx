import React, { useState } from "react";

const RegistroProveedores = () => {
  const [proveedores, setEmpleados] = useState({
    str_nombre: "",
    str_direccion: "",
    str_telefono: "",
    str_ruc: "",
    str_correo: "",
  });
  const handleChange = (event) => {
    setEmpleados({
      ...proveedores,
      [event.target.name]: event.target.value,
    });
  };

  // función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(proveedores);
  };

  return (
    <div className="columns is-centered">
      <div className="column is-three-fifths-desktop">
        <div className="box">
          <form onSubmit={handleSubmit}>
            <center>
              <h1 className="mb-2 title is-3 has-text-primary">
                Registrar Proveedor
              </h1>
            </center>
            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="str_nombre"
                  value={proveedores.str_nombre}
                  onChange={handleChange}
                  placeholder="Nombres y Apellidos"
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="str_telefono"
                  value={proveedores.str_telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
                />
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary is-primary has-text-centered"
                  type="text"
                  name="str_ruc"
                  value={proveedores.str_ruc}
                  onChange={handleChange}
                  placeholder="Cédula"
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="str_direccion"
                  value={proveedores.str_direccion}
                  onChange={handleChange}
                  placeholder="Dirección"
                />
              </div>
            </div>
            <div>
                <input
                  className="input is-primary has-text-centered"
                  type="email"
                  name="str_correo"
                  value={proveedores.str_correo}
                  onChange={handleChange}
                  placeholder="Correo Electronico"
                />
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

export default RegistroProveedores;
