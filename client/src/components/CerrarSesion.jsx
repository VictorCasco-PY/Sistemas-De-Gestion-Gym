import React from 'react'
import { useNavigate } from 'react-router-dom';

const CerrarSesion = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }
    return (
        <>
            <button className='button is-info' onClick={handleLogout}>Cerrar Sesion</button>
        </>
    )
}

export default CerrarSesion