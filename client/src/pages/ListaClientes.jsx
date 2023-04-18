import React from 'react'
import ClientesTable from './ClientesTable';

const ListaClientes = () => {
    const data = [
        { name: 'John', plan: 25, estadopago: 'john@example.com' },
        { name: 'Jane', plan: 30, estadopago: 'jane@example.com' },
        { name: 'Bob', plan: 35, estadopago: 'bob@example.com' },
      ];
  
    return (  
    <div>
        <h1>Lista de Clientes</h1>
        <div className='pageMain'>
            <ClientesTable data={data}/>
        </div>
    </div>
  )
}

export default ListaClientes;