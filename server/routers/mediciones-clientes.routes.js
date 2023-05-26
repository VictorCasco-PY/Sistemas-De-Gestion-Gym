import {Router} from "express";
import {MedicionCliente} from "../controllers/mediciones_clientes.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const medicionesClientes = new MedicionCliente();

// Aca vamos a cargar todas las rutas de planes de pagos
const medicionesClientesRoutes = Router();

medicionesClientesRoutes.get("/mediciones-clientes", authMiddleware(['caja', 'entrenador']), medicionesClientes.getAll);
medicionesClientesRoutes.get("/mediciones-clientes/:id",authMiddleware(['caja', 'entrenador']), medicionesClientes.getByParams)
// Crear 
medicionesClientesRoutes.post(
    "/mediciones-clientes",
    authMiddleware(['entrenador']),
    checkMiddleWare(['id_cliente', 'peso', 'altura', 'cintura', 'piernas', 'porcentaje_grasa_corporal']),
    medicionesClientes.crear
);

medicionesClientesRoutes.put("/mediciones-clientes/:id", authMiddleware(['entrenador']), medicionesClientes.update);

medicionesClientesRoutes.delete("/mediciones-clientes/:id", authMiddleware(['entrenador']), medicionesClientes.delete)

export default medicionesClientesRoutes;
