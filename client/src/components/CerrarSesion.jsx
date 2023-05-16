import React from 'react'
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const CerrarSesion = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }
    return (
        <>
            <button className='button is-info m-5' onClick={handleLogout}><LogoutIcon /></button>
        </>
    )
}

export default CerrarSesion