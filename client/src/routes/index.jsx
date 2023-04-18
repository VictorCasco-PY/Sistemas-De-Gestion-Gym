import { createBrowserRouter } from "react-router-dom";
import RegistroCliente from "../pages/RegistroCliente";
import ListaClientes from "../pages/ListaClientes";
import { DetallesCliente } from "../pages/DetallesCliente";


export const routes = createBrowserRouter([
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
        element: <></>,
    },
    {
        path: "/registroEmpleado",
        element: <></>,
    },

]);