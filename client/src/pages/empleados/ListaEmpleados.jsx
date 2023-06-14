import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import TablaUsuarios from './TablaUsuarios';

const ListaEmpleados = () => {

    return (
        <div className='column'>
            <div className="headerTitle">
                <h1 className='title is-size-2'>Lista de Empleados</h1>
                <hr />
            </div>
            <div className='is-flex is-flex-direction-column p-5 has-background-light column mr-auto ml-auto'
            style={{border: "1px solid #D4D4D4", borderRadius: "8px", maxWidth:"1200px"}}>
                <div className="columns column is-flex is-flex-direction-column">
                    <div className='column is-flex is-justify-content-flex-end m-0 p-0'>
                        <Link className="custom-link is-flex" to="/registroEmpleado"><button className='button is-success'><AddIcon /> Agregar Empleado</button></Link>
                    </div>
                    <TablaUsuarios />
                </div>
            </div>
        </div>
    )
}

export default ListaEmpleados;