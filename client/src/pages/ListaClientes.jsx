import React from 'react'
import ClientesTable from './ClientesTable';
import { DetallesCliente } from './DetallesCliente';
import { Link, Route, Routes } from 'react-router-dom';

const ListaClientes = () => {

    return (
        <div className='m-2'>
            <div className=" headerTitle">
                <h1 className='is-size-2'>Lista de Clientes</h1>
            </div>
            <div className='is-flex is-justify-content-center p-2 pageMain has-background-light'>
                <ClientesTable />
            </div>
        </div>
    )
}

export default ListaClientes;