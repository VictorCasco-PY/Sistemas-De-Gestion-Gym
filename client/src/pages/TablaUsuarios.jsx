import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import api from "../services/api";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SortIcon from '@mui/icons-material/Sort';


const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ordenNombre, setOrdenNombre] = useState("");


  useEffect(() => {  
    api.get("/empleados", { params: { ordenNombre } })
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
      confirmButtonColor: '#ff3860',
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
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
  
    api.get("/empleados", {
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
    <div>
      <div className="columns">
          <div className="column">
          <h1 className="title is-3 has-text-primary">
                Lista de Empleados
              </h1>
          </div>
          <div className="columns">
              <div className="column">
                  <input className="input is-primary is-primary has-text-centered" type="search" placeholder="Buscar" value={busqueda} onChange={handleBusquedaChange} />
              </div>
              <div className="column">
                <Link to = {`/registroEmpleado`}>
                  <button className="button is-link is-outlined"><PersonAddAltIcon fontSize="string"/>Agregar</button>
                </Link>             
            </div>
          </div>
      </div>
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>
            <button className="button is-white is-small" onClick={handleSortClick}>
              <SortIcon fontSize="string"/>
            </button>
            Nombre
            </th>
          <th>Cédula</th>
          <th>Rol</th>
          <th>-</th>
        </tr>
      </thead>
      <tbody>
        {usuariosFiltrados.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.str_nombre}</td>
            <td>{usuario.str_cedula}</td>
            <td>{usuario.rol}</td>
            <td>
            <Link to={`/detallesEmpleado/${usuario.id}`}>
                <button className="button is-info is-outlined mr-2"> <RemoveRedEyeIcon fontSize="string"/> </button>
              </Link>
              <button className="button is-danger is-outlined" onClick={() => handleEliminarClick(usuario.id)}>
                <DeleteIcon fontSize="string"/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TablaUsuarios;
