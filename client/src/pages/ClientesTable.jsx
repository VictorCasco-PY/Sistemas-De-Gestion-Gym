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
    "pendiente": "has-background-warning has-text-black",
    "Atrasado": "has-background-danger"
  };

  if (!clientes) {
    return <div className='title'>Cargando clientes...</div>;
  }

  return (
    <table class="table table is-bordered tableNew has-background-light is-bordered">
      <thead className='has-text-centered'>
        <th className='is-size-5'>Nombre</th>
        <th className='is-size-6'>Plan</th>
        <th className='is-size-6'>Estado de Pago</th>
        <th className='is-size-6'></th>
      </thead>
      <tbody>
        {clientes.map(cliente => (
          <tr key={cliente.cliente_id}>
            <td className='is-size-5'>{cliente.str_nombre_cliente}</td>
            <td className='is-size-5'>{cliente.str_modalidad}</td>
            <td className='is-size-5'>
              <button className={` ${colorMap[cliente.estado_de_pago]} button is-static has-text-white`}>
                {cliente.estado_de_pago}
              </button>
            </td>
            <td className='is-size-5'>
              <Link to={`/detallesCliente/${cliente.cliente_id}`}>
                <button class="button is-link is-rounded is-outlined">Ver Mas</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}