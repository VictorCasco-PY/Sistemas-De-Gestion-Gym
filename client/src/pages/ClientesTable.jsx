import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ClientesTable() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:8000/planes-de-pagos").then((response) => {
        setClientes(response.data);
      });
    }, []);

  const colorMap = {
    "En regla": "has-background-success",
    "pendiente": "has-background-warning",
    "Atrasado": "has-background-danger"
  };

  if (!clientes) {
    return <div className='title'>Cargando clientes...</div>;
  }

  return (
    <table class="table table is-bordered tableNew has-background-light is-bordered">
      <thead>
        <th>Nombre</th>
        <th>Plan</th>
        <th>Estado de Pago</th>
        <th></th>
      </thead>
      <tbody>
        {clientes.map(cliente => (
          <tr key={cliente.cliente_id}>
            <td>{cliente.str_nombre_cliente}</td>
            <td>{cliente.str_modalidad}</td>
            <td>
              <button className={` ${colorMap[cliente.estado_de_pago]} button is-static has-text-white`}>
                {cliente.estado_de_pago}
              </button>
            </td>
            <td>
              <Link to={`/detallesCliente/${cliente.name}`}>
                <button class="button is-link is-rounded is-outlined">Ver Mas</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}