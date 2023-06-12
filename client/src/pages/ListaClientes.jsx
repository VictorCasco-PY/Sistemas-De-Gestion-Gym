import React from 'react'
import ClientesTable from './ClientesTable';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const ListaClientes = () => {

    return (
        <div className='column'>
            <div className="headerTitle">
                <h1 className='is-size-2'>Lista de Clientes</h1>
            </div>
            <div className='is-flex is-flex-direction-column p-5 pageMain has-background-light'
            style={{border: "1px solid #D4D4D4", borderRadius: "8px"}}>
                <div className="columns column is-four-fifths is-flex is-flex-direction-column">
                    <div className='column is-flex is-justify-content-flex-end m-0 p-0'>
                        <Link className="custom-link is-flex" to="/registro_cliente"><button className='button is-success'><AddIcon /> Agregar Cliente</button></Link>
                    </div>
                    <ClientesTable />
                </div>
            </div>
        </div>
    )
}

export default ListaClientes;