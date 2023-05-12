import React, { useState, useEffect } from "react";
import axios from "axios";

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/empleados")
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cédula</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(usuario => (
          <tr key={usuario.id}>
            <td>{usuario.str_nombre}</td>
            <td>{usuario.str_cedula}</td>
            <td>{usuario.rol}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaUsuarios;
