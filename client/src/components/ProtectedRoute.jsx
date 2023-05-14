import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ isAllowed, children, redirectTo = "/" }) => {
    //const { userData } = useContext(AuthContext);
    if (!isAllowed) {
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />;
}

export default ProtectedRoute;