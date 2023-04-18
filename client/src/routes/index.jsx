import { createBrowserRouter } from "react-router-dom";
import RegistroCliente from "../pages/RegistroCliente";


export const routes = createBrowserRouter([
    {
        path: "/registroClientes",
        element: <RegistroCliente />,
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