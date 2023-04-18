import React from 'react'

export default function ClientesTable(props) {



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
