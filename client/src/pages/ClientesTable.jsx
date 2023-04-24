import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ClientesTable() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/clientes')
          .then(response => {
            setClientes(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    const colorMap = {
        "En regla": "has-background-success",
        "Pendiente": "has-background-warning",
        "Atrasado": "has-background-danger"
      };
    

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
                    <tr key={cliente.id}>
                        <td>{cliente.str_nombre}</td>
                        <td>{cliente.plan}</td>
                        <td><button className={` ${colorMap[cliente.estadopago]} button is-static has-text-white`}>{cliente.estadopago}</button></td>
                        <td>
                            <Link to={`/detallesCliente/${cliente.name}`}>
                            <button class="button is-link is-rounded is-outlined">Ver Mas</button></Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
