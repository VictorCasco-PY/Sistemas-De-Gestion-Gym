import {Router} from "express"
import {check} from "express-validator";
import {PlanesDePagos} from "../controllers/planes_de_pagos.controller.js";

const planesDePagos = new PlanesDePagos();

const planesPagosRoutes = Router();

planesPagosRoutes.get('/planes-de-pagos', planesDePagos.getAll);

planesPagosRoutes.get('/planes-de-pagos/:id', planesDePagos.getByParams);

planesPagosRoutes.post('/planes-de-pagos', [
    check("cliente_id", "cliente_id  es un campo requerido").notEmpty(),
    check("tipo_modalidad_de_pago_id", "tipo_modalidad_de_pago_id  es un campo requerido").notEmpty(),
    check("date_fecha_de_vencimiento", "date_fecha_de_vencimiento  es un campo requerido").notEmpty(),
    ], planesDePagos.crear);

planesPagosRoutes.put('/planes-de-pagos/:id', planesDePagos.update)

planesPagosRoutes.delete('/planes-de-pagos/:id', planesDePagos.delete)

export default planesPagosRoutes;