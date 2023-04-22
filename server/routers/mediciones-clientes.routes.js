import {Router} from "express"
import {check} from "express-validator";
import {crearMedicionCliente, getMediciones} from "../controllers/mediciones_clientes.controller.js";

const planesPagosRouter = Router();

planesPagosRouter.get('/mediciones-clientes', getMediciones);
planesPagosRouter.post('/mediciones-clientes',[
    check("cliente_id", "cliente_id es un campo requerido").notEmpty(),
    check("peso", "peso es un campo requerido").notEmpty(),
    check("altura", "altura es un campo requerido").notEmpty(),
    check("cintura", "cintura es un campo requerido").notEmpty(),
    check("piernas", "piernas es un campo requerido").notEmpty(),
    check("porcientaje_masa_corporal", "porcentaje_masa_corporal  es un campo requerido")
    ] ,crearMedicionCliente);
export default planesPagosRouter