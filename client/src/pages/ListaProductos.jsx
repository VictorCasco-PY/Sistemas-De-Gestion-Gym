import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../services/api";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SortIcon from "@mui/icons-material/Sort";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  const [sortType, setSortType] = useState(""); // Tipo de orden: "nombre" o "precio"
  const [sortDirection, setSortDirection] = useState(""); // Dirección del orden: "asc" o "desc"

  const [busqueda, setBusqueda] = useState("");

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const productosFiltrados = productos.filter((producto) =>
  producto.str_nombre.includes(busqueda)
);

  const handleSortClick = (type) => {
    if (sortType === type) {
      // Si el tipo de orden es el mismo, cambia la dirección del orden
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Si el tipo de orden es diferente, establece el nuevo tipo de orden y dirección ascendente
      setSortType(type);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    api
      .get("/productos", {
        params: {
          ordenNombre: sortType === "nombre" ? sortDirection : undefined,
          ordenPrecio: sortType === "precio" ? sortDirection : undefined,
        },
      })
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sortType, sortDirection]);

  const handleEliminarClick = (id) => {
    Swal.fire({
      title: "Confirmar Eliminación",
      text: "¿Estás seguro de que deseas eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/producto/${id}`)
          .then((response) => {
            console.log(response.data);
            setProductos(productos.filter((producto) => producto.id !== id));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div>
      <div className="columns">
        <div className="column">
          <h1 className="title is-3 has-text-primary">Lista de Productos</h1>
        </div>
        <div className="columns">
          <div className="column">
            <input
              className="input is-primary is-primary has-text-centered"
              type="search"
              placeholder="Buscar"
              value={busqueda}
              onChange={handleBusquedaChange}
            />
          </div>
          <div className="column">
            <Link to={`/registroProducto`}>
              <button className="button is-link is-outlined">
                <PersonAddAltIcon fontSize="string" />
                Agregar
              </button>
            </Link>
          </div>
        </div>
      </div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>
              <button
                className="button is-white is-small"
                onClick={() => handleSortClick("nombre")}
              >
                <SortIcon fontSize="string" />
              </button>
              Nombre
            </th>
            <th>Descripción</th>
            <th>IVA</th>
            <th>
              <button
                className="button is-white is-small"
                onClick={() => handleSortClick("precio")}
              >
                <SortIcon fontSize="string" />
              </button>
              Precio
            </th>
            <th>Código</th>
            <th>Cantidad</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.str_nombre}</td>
              <td>{producto.str_descripcion}</td>
              <td>{producto.iva}</td>
              <td>{producto.precio}</td>
              <td>{producto.str_codigo}</td>
              <td>{producto.cantidad}</td>
              <td>
                <Link to={`/detallesProducto/${producto.id}`}>
                  <button className="button is-info is-outlined mr-2">
                    <RemoveRedEyeIcon fontSize="string" />{" "}
                  </button>
                </Link>
                <button
                  className="button is-danger is-outlined"
                  onClick={() => handleEliminarClick(producto.id)}
                >
                  <DeleteIcon fontSize="string" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
};

export default ListaProductos;
