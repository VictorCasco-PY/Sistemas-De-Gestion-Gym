import React from 'react'
import { Link } from 'react-router-dom';

export default function ClientesTable(props) {
    const { data } = props;

    return (
        <table>
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
                        <td>{item.estadopago}</td>
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
