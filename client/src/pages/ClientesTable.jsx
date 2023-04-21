import React from 'react'
import { Link } from 'react-router-dom';

export default function ClientesTable(props) {
    const { data } = props;
    const colorMap = {
        "En regla": "has-background-success",
        "Pendiente": "has-background-warning",
        "Atrasado": "has-background-danger",
        // Add more categories as needed
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
                {props.data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.plan}</td>
                        <td><button className={` ${colorMap[item.estadopago]} button is-static has-text-white`}>{item.estadopago}</button></td>
                        <td>
                            <Link to={`/detallesCliente/${item.name}`}>
                            <button class="button is-link is-rounded is-outlined">Ver Mas</button></Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
