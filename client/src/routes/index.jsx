import { createBrowserRouter } from "react-router-dom";
import RegistroCliente from "../pages/RegistroCliente";
import ListaClientes from "../pages/ListaClientes";


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