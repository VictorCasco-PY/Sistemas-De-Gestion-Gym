import {Router} from "express";
import { Factura } from "../controllers/facturas.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const factura = new Factura();
const facturasRoutes = Router();

facturasRoutes.post('/facturas',
    checkMiddleWare(['id_cliente','id_timbrado','total','saldo','iva_5','iva_10','iva_exenta']),
    factura.crear
);

facturasRoutes.get('/facturas', factura.getAll)

facturasRoutes.get('/reporteVentas', factura.getReporte)

facturasRoutes.get('/factura/:id', factura.getByParams);

facturasRoutes.put('/factura/:id', factura.update)

facturasRoutes.delete('/factura/:id', factura.delete)

export default facturasRoutes;