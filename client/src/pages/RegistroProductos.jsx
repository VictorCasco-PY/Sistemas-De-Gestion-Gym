import React, { useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RegistroProductos = () => {
  const productosData = {
    str_descripcion: "",
    precio: "",
    iva: null, // Valor inicial null
    str_nombre: "",
    str_codigo: "",
    cantidad: "",
  };

  const [productos, setProductos] = useState(productosData);

  const opcionesIva = [
    { label: "IVA", value: null }, // Opción de placeholder
    { label: "0%", value: "0" },
    { label: "5%", value: "5" },
    { label: "10%", value: "10" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductos({
      ...productos,
      [name]: value,
    });
  };

  // función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    if (productos.iva === null || productos.cantidad < 0) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar el producto",
        text: "Por favor, verifica los datos e intenta nuevamente",
      });
      return;
    }
    api
      .post("/productos", productos)
      .then((response) => {
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
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error al registrar el producto",
          text: "Por favor, verifica los datos e intenta nuevamente",
        });
      });
  };

  return (
<div className="columns is-centered">
      <div className="column is-three-fifths-desktop">
        <div className="box">
          <form onSubmit={handleSubmit}>
          <Link to="/listaProductos">
                <button
                  className="button is-link is-outlined"
                  style={{ display: "inline-block" }}
                >
                  <ArrowBackIcon fontSize="string" />
                </button>
              </Link>
            <center>
              <h1
                className="mb-2 title is-3 has-text-primary"
                style={{ display: "inline-block", marginRight: "10px" }}
              >
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div className="column">
                <input
                  className="input is-primary has-text-centered"
                  type="number"
                  name="cantidad"
                  value={productos.cantidad}
                  onChange={handleChange}
                  placeholder="Cantidad"
                  required
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <input
                  className="input is-primary is-primary has-text-centered"
                  type="text"
                  name="precio"
                  value={productos.precio}
                  onChange={handleChange}
                  placeholder="Precio"
                  required
                />
              </div>
              <div className="column select is-primary">
                <select
                  className="has-text-centered"
                  name="iva"
                  value={productos.iva || ""}
                  onChange={handleChange}
                  required
                >
                  {opcionesIva.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </select>
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

export default RegistroProductos;
