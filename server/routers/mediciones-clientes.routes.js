import {Router} from "express";
import {check} from "express-validator";
import {MedicionesClientes} from "../controllers/mediciones_clientes.controller.js";

const medicionesClientes = new MedicionesClientes();

// Aca vamos a cargar todas las rutas de planes de pagos
const medicionesClientesRoutes = Router();

medicionesClientesRoutes.get("/mediciones-clientes", medicionesClientes.getAll);
medicionesClientesRoutes.get("/mediciones-clientes/:id", medicionesClientes.getByParams)
// Crear 
medicionesClientesRoutes.post(
    "/mediciones-clientes",
    [
        check("cliente_id", "cliente_id es un campo requerido").notEmpty(),
        check("peso", "peso es un campo requerido").notEmpty(),
        check("altura", "altura es un campo requerido").notEmpty(),
        check("cintura", "cintura es un campo requerido").notEmpty(),
        check("piernas", "piernas es un campo requerido").notEmpty(),
        check(
            "porcentaje_grasa_corporal",
            "porcentaje_grasa_corporal  es un campo requerido"
        ).notEmpty(),
    ],
    medicionesClientes.crear
);

medicionesClientesRoutes.put("/mediciones-clientes/:id", medicionesClientes.update);

medicionesClientesRoutes.delete("/mediciones-clientes/:id", medicionesClientes.delete)

export default medicionesClientesRoutes;
