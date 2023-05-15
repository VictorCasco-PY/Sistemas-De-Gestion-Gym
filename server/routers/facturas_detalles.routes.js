import {check} from "express-validator";
import {Router} from "express";
import { FacturaDetalle } from "../controllers/facturas_detalles.controller.js";

const facturaDetalle = new FacturaDetalle();
const facturasDetallesRoutes = Router();

facturasDetallesRoutes.post('/facturas', [
        check('id_factura', 'El campo id_factura es requerido').notEmpty(),
        check('id_factura', 'El campo id_factura es requerido').notEmpty(),
        check('id_factura', 'El campo id_factura es requerido').notEmpty(),
        check('id_factura', 'El campo id_factura es requerido').notEmpty(),
        check('id_factura', 'El campo id_factura es requerido').notEmpty(),
        check('id_factura', 'El campo id_factura es requerido').notEmpty(),
        check('id_factura', 'El campo id_factura es requerido').notEmpty(),
        check('id_factura', 'El campo id_factura es requerido').notEmpty(),
    ],
    facturaDetalle.crear
);

facturasDetallesRoutes.get('/facturas', facturaDetalle.getAll)

facturasDetallesRoutes.get('/factura/:id', facturaDetalle.getByParams);

facturasDetallesRoutes.put('/factura/:id', facturaDetalle.update)

facturasDetallesRoutes.delete('/factura/:id', facturaDetalle.delete)

export default facturasDetallesRoutes;