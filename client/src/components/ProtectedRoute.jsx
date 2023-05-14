import React from 'react'

const ProtectedRoute = ({ children }) => {
    if (!user) { }
    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute