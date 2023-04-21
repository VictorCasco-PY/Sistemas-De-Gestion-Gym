import React from 'react'
import ClientesTable from './ClientesTable';
import { DetallesCliente } from './DetallesCliente';
import { Link, Route, Routes } from 'react-router-dom';

const ListaClientes = () => {
    const data = [
        { name: 'John', plan: 25, estadopago: 'En regla' },
        { name: 'Jane', plan: 30, estadopago: 'Pendiente' },
        { name: 'Bob', plan: 35, estadopago: 'Atrasado' },
    ];

    return (
        <div>
            <h1 className='has-text-black'>Lista de Clientes</h1>
            <div className='pageMain'>
                <ClientesTable data={data} />
            </div>
        </div>
    )
}

export default ListaClientes;