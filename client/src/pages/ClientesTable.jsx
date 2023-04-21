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
        <table class="table table is-bordered tableNew">
            <thead>
                <th>Nombre</th>
                <th>Plan</th>
                <th>Estado de Pago</th>
            </thead>
            <tbody>
                {props.data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.plan}</td>
                        <td className={colorMap[item.estadopago]}>{item.estadopago}</td>
                        <td>
                            <Link to={`/detallesCliente/${item.name}`}>Ver mas</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>Table Footer</td>
                </tr>
            </tfoot>
        </table>
    )
}
