import React from 'react'
import ClientesTable from './ClientesTable';
import { DetallesCliente } from './DetallesCliente';
import { Link, Route, Routes } from 'react-router-dom';

const ListaClientes = () => {
    const data = [
        { name: 'John', plan: 'Diario', estadopago: 'En regla' },
        { name: 'Jane', plan: 'Mensual', estadopago: 'Pendiente' },
        { name: 'Bob', plan: 'Semanal', estadopago: 'Atrasado' },
    ];

    return (
        <div className='pageSkeleton'>
            <h1>Lista de Clientes</h1>
            <div className='pageMain has-background-light'>
                <ClientesTable data={data} />
            </div>
        </div>
    )
}

export default ListaClientes;