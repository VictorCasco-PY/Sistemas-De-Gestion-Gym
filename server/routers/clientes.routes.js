import {Router} from "express"
import {
    getClientes,
    crearCliente,
    getClienteByParams
} from "../controllers/clientes.controller.js";

import { getPlanPagoClienteByParams } from "../controllers/planes_de_pagos.controller.js";

import {check} from "express-validator";
import { getMedicionesDeCliente } from "../controllers/mediciones_clientes.controller.js";

const clientesRouter = Router();

clientesRouter.get('/clientes', getClientes);
clientesRouter.get('/cliente/:id', getClienteByParams);
clientesRouter.post('/clientes', [
    check('str_nombre', 'str_nombre es un campo requerido').notEmpty(),
    check('edad', 'edad es un campo requerido').notEmpty(),
    check('str_direccion', 'str_direccion es un campo requerido').notEmpty(),
    check('str_ruc', 'str_ruc es un campo requerido').notEmpty(),
], crearCliente)

clientesRouter.get('/cliente/:cliente_id/plan-de-pago', getPlanPagoClienteByParams);
clientesRouter.get('/cliente/:cliente_id/medicion-cliente', getMedicionesDeCliente)


export default clientesRouter;