import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import api from "../../services/api";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SortIcon from "@mui/icons-material/Sort";

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ordenNombre, setOrdenNombre] = useState("");

  useEffect(() => {
    api
      .get("/empleados", { params: { ordenNombre } })
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleEliminarClick = (id) => {
    Swal.fire({
      title: "Confirmar Eliminación",
      text: "¿Estás seguro de que deseas eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff3860",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/empleado/${id}`)
          .then((response) => {
            console.log(response.data);
            setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.str_cedula.includes(busqueda)
  );

  const handleSortClick = () => {
    const newOrdenNombre = ordenNombre === "asc" ? "desc" : "asc";
    setOrdenNombre(newOrdenNombre);

    api
      .get("/empleados", {
        params: { ordenNombre: newOrdenNombre },
      })
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="column is-flex is-flex-direction-column">
      <div className="column is-flex mb-0 pb-0">
        <div style={{ width: "20rem" }}>
          <input
            className="input"
            type="search"
            placeholder="Buscar por Número de Cédula"
            value={busqueda}
            onChange={handleBusquedaChange}
          />
        </div>

      </div>
      <div className="column is-flex is-justify-content-center is-flex-direction-column m-0 p-0">
        <table className="table table is-bordered tableNew has-background-light is-bordered p-3" style={{ width: "100%" }}>
          <thead className='has-text-centered'>
            <tr className='is-size-6'>
              <th className='is-size-5'>
                <button
                  className="button is-light is-small"
                  onClick={handleSortClick}
                >
                  <SortIcon fontSize="string" />
                </button>
                Nombre
              </th >
              <th className='is-size-5'>Cédula</th>
              <th className='is-size-5'>Rol</th>
              <th className='is-size-5'></th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td className='is-size-5'>{usuario.str_nombre}</td>
                <td className='is-size-5'>{usuario.str_cedula}</td>
                <td className='is-size-5'>{usuario.rol}</td>
                <td className='is-size-5'>
                  <Link to={`/detallesEmpleado/${usuario.id}`}>
                    <button className="button is-info is-outlined mr-2 is-rounded">
                      <RemoveRedEyeIcon fontSize="string" />
                    </button>
                  </Link>
                  <button
                    className="button is-danger is-outlined is-rounded"
                    onClick={() => handleEliminarClick(usuario.id)}
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

export default TablaUsuarios;
