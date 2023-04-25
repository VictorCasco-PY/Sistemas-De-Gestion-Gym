import {Router} from "express";
import {check} from "express-validator";
import {
    crearMedicionCliente,
    getMediciones,
} from "../controllers/mediciones_clientes.controller.js";

// Aca vamos a cargar todas las rutas de planes de pagos
const medicionesClientesRoutes = Router();

medicionesClientesRoutes.get("/mediciones-clientes", getMediciones);

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
            "porcientaje_grasa_corporal",
            "porcentaje_grasa_corporal  es un campo requerido"
        ),
    ],
    crearMedicionCliente
);

export default medicionesClientesRoutes;
