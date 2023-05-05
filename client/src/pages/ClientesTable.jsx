import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ClientesTable() {
  const [clientes, setClientes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/planes-de-pagos").then((response) => {
      setClientes(response.data);
      setFilteredData(response.data);
    });
  }, []);

  const colorMap = {
    "En regla": "has-background-success",
    "pendiente": "has-background-warning has-text-black",
    "Atrasado": "has-background-danger"
  };

  
  const handleFilter = (field) => {
    console.log(filteredData)
    const filtered = clientes.filter((item) => item[field]);
    setFilteredData(filtered);
    console.log(filteredData)
  };

  if (!clientes) {
    return <div className='title'>Cargando clientes...</div>;
  }

  return (
    <table className="table table is-bordered tableNew has-background-light is-bordered">
      <thead className='has-text-centered'>
        <tr>
          <th className='is-size-5' onClick={() => handleFilter("str_nombre_cliente")}>Nombre</th>
          <th className='is-size-6' onClick={() => handleFilter("str_modalidad")}>Plan</th>
          <th className='is-size-6' onClick={() => handleFilter("estado_de_pago")}>Estado de Pago</th>
          <th className='is-size-6'></th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map(cliente => (
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
                <button className="button is-link is-rounded is-outlined">Ver Mas</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}