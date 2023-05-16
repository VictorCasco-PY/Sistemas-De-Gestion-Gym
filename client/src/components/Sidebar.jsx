import React, { Children } from 'react';
import logo from '../assets/logo.png'
import CerrarSesion from './CerrarSesion';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const Sidebar = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <nav className='navbar is-light'>
                <div className='navbar-brand mt-3 ml-3'>
                    <Link to="/home">
                        <img src={logo} width={270} height={90} />
                    </Link>
                </div>
                <div className='navbar-end'>
                    <span className='title is-3 m-5'>Bienvenido, {user.nombre} <span className='title is-5 has-text-grey'>({user.rol})</span></span>
                    <CerrarSesion />
                </div>
            </nav>

            <div className="columns ml-3">
                <aside className="menu column is-one-fifth is-2 has-background-light">
                    <p className="menu-label has-text-grey-dark title is-4">Entrenadores</p>
                    <ul className="menu-list title is-5">
                        <li>
                            <Link to="/registro_cliente"><AddIcon fontSize="string" />  Registrar cliente</Link>
                        </li>
                        <li>
                            <Link to="/listaClientes"><FormatListBulletedIcon fontSize="string" />  Lista de Clientes</Link>
                        </li>
                    </ul>
                    <p className="menu-label has-text-grey-dark title is-4">
                        Caja
                    </p>
                    <ul className="menu-list title is-5">
                        <li>
                            <Link to="/caja"><PointOfSaleIcon />  Caja</Link>
                        </li>
                        <li>
                            <Link to="#"><PointOfSaleIcon />  Stock</Link>
                        </li>
                        <li>
                            <Link to="#"><PointOfSaleIcon />  Facturacion</Link>
                        </li>

                    </ul>
                    <p className="menu-label has-text-grey-dark title is-4">
                        Proveedores
                    </p>
                    <ul className="menu-list title is-5">
                        <li>
                            <Link to="/registroProveedores"><AddIcon fontSize="string" />  Agregar Proveedor</Link>
                        </li>
                        <li>
                            <Link to="/lista_proveedores"><FormatListBulletedIcon fontSize="string" />  Lista de Proveedores</Link>
                        </li>
                    </ul>
                    <p className="menu-label has-text-grey-dark title is-4">
                        Empleados
                    </p>
                    <ul className='menu-list title is-5'>
                        <li>
                            <Link to="/registroEmpleado"><AddIcon fontSize="string" />  Registrar Empleado</Link>
                        </li>
                        <li>
                            <Link to="/listaEmpleados"><FormatListBulletedIcon fontSize="string" />  Lista de Empleados</Link>
                        </li>
                    </ul>
                </aside>
                <div className='content column'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Sidebar