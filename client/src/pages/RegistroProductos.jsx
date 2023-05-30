import React, { useState } from "react";
import axios from "axios"
import Swal from "sweetalert2";

const RegistroProductos = () => {
  const productosData = {
    str_descripcion: "",
    precio: "",
    iva: "",
    str_nombre: "",
    str_codigo: "",

  };
  const [productos, setProductos] = useState(productosData);

  const handleChange = (event) => {
    setProductos({
      ...productos,
      [event.target.name]: event.target.value,
    });
  };

  // función para manejar el envío del formulario
// función para manejar el envío del formulario
const handleSubmit = (event) => {
  event.preventDefault();

  const user = JSON.parse(localStorage.getItem("user")); // Obtener el token del localStorage
  const headers = {
    token: user.token // Agregar el token en el encabezado 'token'
  };

  axios
    .post('http://localhost:8000/productos', productos, { headers })
    .then(response => {
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Producto registrado con éxito",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      setProductos(productosData); //restablecer a su valor inicial
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al registrar el usuario",
        text: "Por favor, verifica los datos e intenta nuevamente",
      });
    });
};


  return (
    <div className="columns is-centered">
      <div className="column is-three-fifths-desktop">
        <div className="box">
          <form onSubmit={handleSubmit}>
            <center>
              <h1 className="mb-2 title is-3 has-text-primary">
                Registrar Producto
              </h1>
            </center>
            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="str_nombre"
                  value={productos.str_nombre}
                  onChange={handleChange}
                  placeholder="Nombre del producto"
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="str_descripcion"
                  value={productos.str_descripcion}
                  onChange={handleChange}
                  placeholder="Descripción"
                />
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary is-primary has-text-centered"
                  type="text"
                  name="str_codigo"
                  value={productos.str_codigo}
                  onChange={handleChange}
                  placeholder="Código"
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="iva"
                  value={productos.iva}
                  onChange={handleChange}
                  placeholder="IVA"
                />
              </div>
            </div>
            <div>
                <input
                  className="input is-primary has-text-centered"
                  type="text"
                  name="precio"
                  value={productos.precio}
                  onChange={handleChange}
                  placeholder="Precio"
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

export default RegistroProductos;
