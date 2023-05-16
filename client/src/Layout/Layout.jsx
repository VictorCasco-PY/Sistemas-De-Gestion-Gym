import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    )
}

export default Layout