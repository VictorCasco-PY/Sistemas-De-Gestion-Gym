import { createBrowserRouter } from "react-router-dom";
import RegistroCliente from "../pages/RegistroCliente";
import ListaClientes from "../pages/ListaClientes";
import { DetallesCliente } from "../pages/DetallesCliente";
import Login from "../pages/Login";
import RegistroEmpleado from "../pages/RegistroEmpleado"
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";


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
                path: "/listaClientes",
                element: <></>,
            },
            {
                path: "/detalleCliente/:id",
                element: <></>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/registroEmpleado",
                element: <RegistroEmpleado />,
            },
            {
                path: "/home",
                element: <Home />
            }
        ]
    }


]);