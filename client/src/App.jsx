import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './main.css'
import 'bulma/css/bulma.min.css';
//import { RegistroCliente, Login, ListaClientes, DetallesCliente, Home, RegistroEmpleado, RegistroProveedores, TablaUsuarios } from './pages';
import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import RegistroCliente from './pages/RegistroCliente';
import ListaClientes from './pages/ListaClientes';
import { DetallesCliente } from './pages/DetallesCliente';
import RegistroProveedores from './pages/RegistroProveedores';
import RegistroEmpleado from './pages/RegistroEmpleado';
import TablaUsuarios from './pages/TablaUsuarios';
import Layout from './Layout/Layout';
import AuthContextProvider from './context/AuthContext';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route index element={<Login />} />
            <Route path='/home' element={<Layout><Home /></Layout>} />
            <Route path='/registro_cliente' element={<Layout><RegistroCliente /></Layout>} />
            <Route path='/listaClientes' element={<Layout><ListaClientes /></Layout>} />
            <Route path='/detallesCliente' element={<Layout><DetallesCliente /></Layout>} />
            <Route path='/detallesCliente/:name' element={<Layout><DetallesCliente /></Layout>} />
            <Route path='/registroProveedores' element={<Layout><RegistroProveedores /></Layout>} />
            <Route path='/registroEmpleado' element={<Layout><RegistroEmpleado /></Layout>} />
            <Route path='/listaEmpleados' element={<Layout><TablaUsuarios /></Layout>} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
