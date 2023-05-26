import {check} from "express-validator";
import {Router} from "express";
import { Factura } from "../controllers/facturas.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";

const factura = new Factura();
const facturasRoutes = Router();

facturasRoutes.post('/facturas',
    checkMiddleWare(['id_cliente','id_timbrado','numero_factura','date_fecha','str_nombre_cliente','str_ruc_cliente','condicion','total','saldo','iva_5','iva_10','iva_exenta']),
    factura.crear
);

facturasRoutes.get('/facturas', factura.getAll)

facturasRoutes.get('/factura/:id', factura.getByParams);

facturasRoutes.put('/factura/:id', factura.update)

facturasRoutes.delete('/factura/:id', factura.delete)

export default facturasRoutes;