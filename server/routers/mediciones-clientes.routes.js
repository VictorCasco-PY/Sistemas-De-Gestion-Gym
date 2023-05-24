import {Router} from "express";
import {check} from "express-validator";
import {MedicionCliente} from "../controllers/mediciones_clientes.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";

const medicionesClientes = new MedicionCliente();

// Aca vamos a cargar todas las rutas de planes de pagos
const medicionesClientesRoutes = Router();

medicionesClientesRoutes.get("/mediciones-clientes", medicionesClientes.getAll);
medicionesClientesRoutes.get("/mediciones-clientes/:id", medicionesClientes.getByParams)
// Crear 
medicionesClientesRoutes.post(
    "/mediciones-clientes",
    checkMiddleWare(['id_cliente', 'peso', 'altura', 'cintura', 'piernas', 'porcentaje_grasa_corporal']),
    medicionesClientes.crear
);

medicionesClientesRoutes.put("/mediciones-clientes/:id", medicionesClientes.update);

medicionesClientesRoutes.delete("/mediciones-clientes/:id", medicionesClientes.delete)

export default medicionesClientesRoutes;
