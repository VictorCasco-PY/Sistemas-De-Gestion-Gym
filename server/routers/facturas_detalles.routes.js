import {check} from "express-validator";
import {Router} from "express";
import { FacturaDetalle } from "../controllers/facturas_detalles.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";

const facturaDetalle = new FacturaDetalle();
const facturasDetallesRoutes = Router();

facturasDetallesRoutes.post('/facturas',
    checkMiddleWare(['id_factura', 'subtotal', 'cantidad', 'precio', 'iva']),
    facturaDetalle.crear
);

facturasDetallesRoutes.get('/facturas', facturaDetalle.getAll)

facturasDetallesRoutes.get('/factura/:id', facturaDetalle.getByParams);

facturasDetallesRoutes.put('/factura/:id', facturaDetalle.update)

facturasDetallesRoutes.delete('/factura/:id', facturaDetalle.delete)

export default facturasDetallesRoutes;