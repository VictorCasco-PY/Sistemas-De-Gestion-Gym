import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ListaProveedores from './ListaProveedores';

const ListaProveedor = () => {

    return (
        <div className='column'>
            <div className="headerTitle">
                <h1 className='is-size-2'>Lista de Proveedores</h1>
            </div>
            <div className='is-flex is-flex-direction-column p-5 pageMain has-background-light'>
                <div className="columns column is-four-fifths is-flex is-flex-direction-column">
                    <div className='column is-flex is-justify-content-flex-end m-0 p-0'>
                        <Link className="custom-link is-flex" to="/registroProveedores"><button className='button is-success'><AddIcon /> Agregar Proveedor</button></Link>
                    </div>
                    <ListaProveedores />
                </div>
            </div>
        </div>
    )
}

export default ListaProveedor;