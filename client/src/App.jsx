import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './main.css'
import 'bulma/css/bulma.min.css';
//import { RegistroCliente, Login, ListaClientes, DetallesCliente, Home, RegistroEmpleado, RegistroProveedores, TablaUsuarios } from './pages';
import React, { useContext } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import RegistroCliente from './pages/RegistroCliente';
import ListaClientes from './pages/ListaClientes';
import { DetallesCliente } from './pages/DetallesCliente';
import RegistroProveedores from './pages/RegistroProveedores';
import RegistroEmpleado from './pages/RegistroEmpleado';
import TablaUsuarios from './pages/TablaUsuarios';
import Layout from './Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Caja from './pages/Caja';
import ListaProveedores from './pages/ListaProveedores';
import Reporte from './pages/Reporte';
import DetalleProveedor from './pages/DetalleProveedor';
import Ventas from './pages/Ventas';
import DetallesUsuario from './pages/DetallesUsuario';
import RegistroProductos from './pages/RegistroProductos';
import TablaProductos from './pages/TablaProductos';



function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.rol === "admin";
  const isCajero = user?.rol === "caja";
  const isEntrenador = user?.rol === "entrenador";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          // Ruta publica principal
          <Route index element={<Login />} />

          // Rutas semi-publicas
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path='/home' element={<Layout><Home /></Layout>} />
          </Route>

          // Rutas de Entrenador
          <Route element={<ProtectedRoute isAllowed={!!user && (isEntrenador || isAdmin || isCajero)} redirectTo='/home' />}>
            <Route path='/registro_cliente' element={<Layout><RegistroCliente /></Layout>} />
            <Route path='/listaClientes' element={<Layout><ListaClientes /></Layout>} />
            <Route path='/detallesCliente' element={<Layout><DetallesCliente /></Layout>} />
            <Route path='/detallesCliente/:name' element={<Layout><DetallesCliente /></Layout>} />
          </Route>

          // Rutas de Cajero
          <Route element={<ProtectedRoute isAllowed={!!user && (isCajero || isAdmin)} redirectTo='/home' />}>
            <Route path='/caja' element={<Layout><Caja /></Layout>} />
            <Route path='/ventas' element={<Layout><Ventas /></Layout>} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={!!user && isAdmin} redirectTo='/home' />}>
            <Route path='/reporte' element={<Layout><Reporte /></Layout>} />
            <Route path='/registroProveedores' element={<Layout><RegistroProveedores /></Layout>} />
            <Route path='/lista_proveedores' element={<Layout><ListaProveedores /></Layout>} />
            <Route path='/proveedor/detalle/:id' element={<Layout><DetalleProveedor /></Layout>} />
            <Route path='/registroEmpleado' element={<Layout><RegistroEmpleado /></Layout>} />
            <Route path='/listaEmpleados' element={<Layout><TablaUsuarios /></Layout>} />
            <Route path='/detallesEmpleado/:id' element={<Layout><DetallesUsuario /></Layout>} />
            <Route path='/productos' element={<Layout><RegistroProductos /></Layout>} />
            <Route path='/listaProductos' element={<Layout><TablaProductos /></Layout>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App
