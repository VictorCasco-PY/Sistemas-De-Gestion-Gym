import {Router} from "express"
import {PlanesDePagos} from "../controllers/planes_de_pagos.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";

const planesDePagos = new PlanesDePagos();

const planesPagosRoutes = Router();

planesPagosRoutes.get('/planes-de-pagos', planesDePagos.getAll);

planesPagosRoutes.get('/planes-de-pagos/:id', planesDePagos.getByParams);

planesPagosRoutes.post('/planes-de-pagos',
    checkMiddleWare(['id_cliente', 'id_tipo_modalidad_de_pago', 'date_fecha_de_vencimiento']),
    planesDePagos.crear);

planesPagosRoutes.put('/planes-de-pagos/:id', planesDePagos.update)

planesPagosRoutes.delete('/planes-de-pagos/:id', planesDePagos.delete)

export default planesPagosRoutes;