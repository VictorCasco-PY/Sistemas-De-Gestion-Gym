import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ListaProveedores = () => {
    const [proveedores, setProveedores] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/proveedores")
            .then(response => {
                setProveedores(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div className='table-container'>
            <table className='table is-bordered'>
                <thead className='title is-3'>
                    <tr>
                        <th>RUC</th>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody className='subtitle is-5'>
                    {proveedores.map((proveedor) => (
                        <tr key={proveedor.id}>
                            <td>{proveedor.str_ruc}</td>
                            <td>{proveedor.str_nombre}</td>
                            <td>{proveedor.str_telefono}</td>
                            <td>{proveedor.str_direccion}</td>
                            <td>{proveedor.str_correo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListaProveedores