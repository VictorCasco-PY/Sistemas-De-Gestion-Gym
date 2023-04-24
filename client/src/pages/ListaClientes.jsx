import React from 'react'
import ClientesTable from './ClientesTable';
import { DetallesCliente } from './DetallesCliente';
import { Link, Route, Routes } from 'react-router-dom';

const ListaClientes = () => {

    return (
        <div className='columns is-multiline is-centered'>
            <div className="column is-full headerTitle is-four-fifths">
                <h1 className='is-size-2'>Lista de Clientes</h1>
            </div>
            <div className='column is-four-fifths is-flex is-justify-content-center p-6 pageMain has-background-light'>
                <ClientesTable />
            </div>
        </div>
    )
}

export default ListaClientes;