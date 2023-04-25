import {Router} from "express"
import {check} from "express-validator";
import {
    crearPlanDePago,
    getAllPlanesDePagos,
    getPlanPagoClienteByParams
} from "../controllers/planes_de_pagos.controller.js";

const planesPagosRoutes = Router();

planesPagosRoutes.get('/planes-de-pagos', getAllPlanesDePagos);

planesPagosRoutes.post('/planes-de-pagos', [
    check("cliente_id", "cliente_id  es un campo requerido").notEmpty(),
    check("tipo_modalidad_de_pago_id", "tipo_modalidad_de_pago_id  es un campo requerido").notEmpty(),
    check("date_fecha_de_vencimiento", "date_fecha_de_vencimiento  es un campo requerido").notEmpty(),
    ], crearPlanDePago);


export default planesPagosRoutes;