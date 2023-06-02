import {check} from "express-validator";
import {Router} from "express";
import { FacturaDetalle } from "../controllers/facturas_detalles.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";

const facturaDetalle = new FacturaDetalle();
const facturasDetallesRoutes = Router();

facturasDetallesRoutes.post('/facturas-detalles',
    checkMiddleWare(['id_factura']),
    facturaDetalle.crear
);

facturasDetallesRoutes.get('/facturas-detalles', facturaDetalle.getAll)

facturasDetallesRoutes.get('/factura-detalle/:id', facturaDetalle.getByParams);

facturasDetallesRoutes.put('/factura-detalle/:id', facturaDetalle.update)

facturasDetallesRoutes.delete('/factura-detalle/:id', facturaDetalle.delete)

export default facturasDetallesRoutes;