import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './main.css'
import 'bulma/css/bulma.min.css';
import React, { useContext } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import ListaClientes from './pages/ListaClientes';
import { DetallesCliente } from './pages/DetallesCliente';
import RegistroProveedores from './pages/proveedores/RegistroProveedores';
import RegistroEmpleado from './pages/empleados/RegistroEmpleado';
import ProtectedRoute from './components/ProtectedRoute';
import Caja from './pages/Caja';
import ListaProveedores from './pages/proveedores/ListaProveedores';
import Reporte from './pages/Reporte';
import DetalleProveedor from './pages/proveedores/DetalleProveedor';
import Ventas from './pages/Ventas';
import DetallesUsuario from './pages/empleados/DetallesUsuario';
import RegistroProductos from './pages/productos/RegistroProductos';
import WizardFormCliente from './pages/clientes/WizardFormCliente';
import NewLayout from './Layout/NewLayout';
import DetallesProducto from './pages/productos/DetallesProducto';
import SesionCaja from './pages/SesionCaja';
import Compras from './pages/Compras';
import ListaFacturas from './pages/facturas/ListaFacturas'
import DetalleFactura from './pages/facturas/DetalleFactura';
import ListaEmpleados from './pages/empleados/ListaEmpleados';
import ListaProveedor from './pages/proveedores/ListaProveedor';
import ListaProducto from './pages/productos/ListaProducto'
import VentasNew from './pages/VentasNew';

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
            <Route path='/home' element={<NewLayout><Home /></NewLayout>} />
          </Route>

          // Rutas de Entrenador
          <Route element={<ProtectedRoute isAllowed={!!user && (isEntrenador || isAdmin || isCajero)} redirectTo='/home' />}>
            <Route path='/registro_cliente' element={<NewLayout><WizardFormCliente /></NewLayout>} />
            <Route path='/listaClientes' element={<NewLayout><ListaClientes /></NewLayout>} />
            <Route path='/detallesCliente' element={<NewLayout><DetallesCliente /></NewLayout>} />
            <Route path='/detallesCliente/:name' element={<NewLayout><DetallesCliente /></NewLayout>} />
          </Route>

          // Rutas de Cajero
          <Route element={<ProtectedRoute isAllowed={!!user && (isCajero || isAdmin)} redirectTo='/home' />}>
            <Route path='/caja' element={<NewLayout><Caja /></NewLayout>} />
            <Route path='/ventas' element={<NewLayout><VentasNew /></NewLayout>} />
            <Route path='/compras' element={<NewLayout><Compras /></NewLayout>} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={!!user && isAdmin} redirectTo='/home' />}>
            <Route path='/reporte' element={<NewLayout><Reporte /></NewLayout>} />
            <Route path='/registroProveedores' element={<NewLayout><RegistroProveedores /></NewLayout>} />
            <Route path='/lista_proveedores' element={<NewLayout><ListaProveedor /></NewLayout>} />
            <Route path='/proveedor/detalle/:id' element={<NewLayout><DetalleProveedor /></NewLayout>} />
            <Route path='/registroEmpleado' element={<NewLayout><RegistroEmpleado /></NewLayout>} />
            <Route path='/listaEmpleados' element={<NewLayout><ListaEmpleados /></NewLayout>} />
            <Route path='/detallesEmpleado/:id' element={<NewLayout><DetallesUsuario /></NewLayout>} />
            <Route path='/registroProducto' element={<NewLayout><RegistroProductos /></NewLayout>} />
            <Route path='/listaProductos' element={<NewLayout>< ListaProducto /></NewLayout>} />
            <Route path='/detallesProducto/:id' element={<NewLayout><DetallesProducto /></NewLayout>} />
            <Route path='/sesionCaja' element={<NewLayout>< SesionCaja /></NewLayout>} />
            <Route path='/facturas' element={<NewLayout><ListaFacturas /></NewLayout>} />
            <Route path='/detalleFactura' element={<DetalleFactura />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App
