import React from 'react'
import logo from '../assets/logo.png'
import CerrarSesion from './CerrarSesion'

const Navbar = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item">
                    <img src={logo} />
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu ">
                <div className="navbar-start">
                    <a className="navbar-item" href='/home'>
                        Inicio
                    </a>

                    <a className="navbar-item" href='/registro_cliente'>
                        Registrar cliente
                    </a>

                    <a className="navbar-item" href='/listaClientes'>
                        Lista de clientes
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            Más
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item">
                                Jobs
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary" href='/registroEmpleado'>
                                <strong>Registrarse</strong>
                            </a>
                            <CerrarSesion />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar