import { createBrowserRouter } from "react-router-dom";
import RegistroCliente from "../pages/RegistroCliente";
import ListaClientes from "../pages/ListaClientes";
import { DetallesCliente } from "../pages/DetallesCliente";
import Login from "../pages/Login";
import RegistroEmpleado from "../pages/RegistroEmpleado"
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import RegistroProveedores from "../pages/RegistroProveedores";
import TablaUsuarios from "../pages/TablaUsuarios";
import Reporte from "../pages/Reporte";


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/registroClientes",
                element: <RegistroCliente />,
            },
            {
                path: "/listaClientes",
                element: <ListaClientes />,
            },
            {
                path: "/detallesCliente",
                element: <DetallesCliente />,
            },
            {
                path: "/detallesCliente/:name",
                element: <DetallesCliente />,
            },
            {
                path: "/registroProveedores",
                element: <RegistroProveedores />,
            },
            {
                path: "/detalleCliente/:id",
                element: <></>,
            },

            {
                path: "/reporte/",
                element: <Reporte />,
            },

            {
                path: "/registroEmpleado",
                element: <RegistroEmpleado />,
            },
            {
                path: "/home",
                element: < Home />
            },
            {
                path: "/listaEmpleados",
                element: <TablaUsuarios />,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },

]);