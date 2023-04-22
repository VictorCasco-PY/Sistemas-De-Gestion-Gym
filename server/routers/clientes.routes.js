import {Router} from "express"
import {
    getClientes,
    crearCliente,
    getClienteByParams
} from "../controllers/clientes.controller.js";
import {check} from "express-validator";

const clientesRouter = Router();

clientesRouter.get('/clientes', getClientes);
clientesRouter.get('/clientes/:id', getClienteByParams);

clientesRouter.post('/clientes', [
    check('str_nombre', 'str_nombre es un campo requerido').notEmpty(),
    check('edad', 'edad es un campo requerido').notEmpty(),
    check('str_direccion', 'str_direccion es un campo requerido').notEmpty(),
    check('str_ruc', 'str_ruc es un campo requerido').notEmpty(),
], crearCliente)

// clientesRouter.get('/clientes/:id/plan-de-pago/', getPlanDePagoDeCliente)


export default clientesRouter;