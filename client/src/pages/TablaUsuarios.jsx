import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Obtener el token del localStorage
        console.log(user.token);
        const headers = {
          token: `${user.token}` // Agregar el token en el encabezado 'Authorization'
        };

        const response = await axios.get("http://localhost:8000/empleados", { headers });
        setUsuarios(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUsuarios();
  }, []);



  const handleEliminarClick = (id) => {
    Swal.fire({
      title: "Confirmar Eliminación",
      text: "¿Estás seguro de que deseas eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
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
            // Remove the user from the table locally
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
              <button className="button is-danger is-outlined" onClick={() => handleEliminarClick(usuario.id)}>
                Eliminar
              </button>
              <Link to={`/detallesEmpleado/${usuario.id}`}>
                <button className="button is-info is-outlined">Detalles</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaUsuarios;
