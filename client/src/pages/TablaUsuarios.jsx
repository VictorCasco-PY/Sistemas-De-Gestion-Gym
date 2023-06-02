import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import api from "../services/api";
const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {  
    api.get("/empleados")
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
        const user = JSON.parse(localStorage.getItem("user")); // Obtener el token del localStorage
        const headers = {
          token: user.token // Agregar el token en el encabezado 'token'
        };

        axios
          .delete(`http://localhost:8000/empleado/${id}`, { headers })
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


  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cédula</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
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
  );
};

export default TablaUsuarios;
