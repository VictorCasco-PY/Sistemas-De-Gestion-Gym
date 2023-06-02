import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../services/api";
import DeleteIcon from '@mui/icons-material/Delete';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api
      .get("/productos")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


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
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>IVA</th>
          <th>Precio</th>
          <th>Código</th>
          <th>Cantidad</th>
          <th>-</th>
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
            <button className="button is-danger is-outlined" onClick={() => handleEliminarClick(producto.id)}>
                <DeleteIcon fontSize="string"/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaProductos;
