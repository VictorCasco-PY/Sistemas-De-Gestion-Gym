import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import SortIcon from "@mui/icons-material/Sort";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [sortType, setSortType] = useState(""); // Tipo de orden: "nombre" o "precio"
  const [sortDirection, setSortDirection] = useState(""); // Dirección del orden: "asc" o "desc"

  const handleBusquedaChange = (event) => {
    const value = event.target.value;
    setBusqueda(value);

    if (value.length >= 3) {
      fetchProductos(value);
    } else {
      setProductos([]); // Restablecer la lista completa de productos
    }
  };

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

  const fetchProductos = async (nombre) => {
    try {
      const response = await api.get("/productos", {
        params: {
          nombre,
          ordenNombre: sortType === "nombre" ? sortDirection : undefined,
          ordenPrecio: sortType === "precio" ? sortDirection : undefined,
        },
      });
      setProductos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminarClick = (id) => {
    Swal.fire({
      title: "Confirmar Eliminación",
      text: "¿Estás seguro de que deseas eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff3860",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/producto/${id}`);
          setProductos(productos.filter((producto) => producto.id !== id));
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    if (busqueda.length >= 3) {
      fetchProductos(busqueda);
    } else {
      fetchProductos(""); // Obtener la lista completa de productos
    }
  }, [busqueda, sortType, sortDirection]);

  return (
    <div className="column is-flex is-flex-direction-column">
      <div className="column is-flex mb-0 pb-0">
        <div style={{ width: "20rem" }}>
          <input
            className="input"
            type="search"
            placeholder="Buscar por Nombre"
            value={busqueda}
            onChange={handleBusquedaChange}
          />
        </div>
      </div>

      <div className='column is-flex is-justify-content-center is-flex-direction-column m-0 p-0'>
        <table className='table table is-bordered tableNew has-background-light is-bordered p-3' style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>
                <button
                  className="button is-light is-small"
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
                  className="button is-light is-small"
                  onClick={() => handleSortClick("precio")}
                >
                  <SortIcon fontSize="string" />
                </button>
                Precio
              </th>
              <th>Código</th>
              <th>Cantidad</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.str_nombre}</td>
                <td>{producto.str_descripcion}</td>
                <td>{producto.iva}</td>
                <td>{producto.precio}</td>
                <td>{producto.str_codigo}</td>
                <td>{producto.cantidad}</td>
                <td>
                  <Link to={`/detallesProducto/${producto.id}`}>
                    <button className="button is-info is-outlined mr-2 is-rounded ">
                      <RemoveRedEyeIcon fontSize="string" />{" "}
                    </button>
                  </Link>
                  <button
                    className="button is-danger is-outlined is-rounded"
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
    </div>
  );
};

export default ListaProductos;
