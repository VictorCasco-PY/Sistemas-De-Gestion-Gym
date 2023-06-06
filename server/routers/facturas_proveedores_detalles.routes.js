import { Router } from "express"
import { check } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";

import { Facturas_proveedores_detalles} from "../controllers/facturas_proveedores_detalles.controller.js";

const facturas_proveedores_detalles = new Facturas_proveedores_detalles();

const facturasProveedoresDetallesRoutes = Router();

facturasProveedoresDetallesRoutes.get('/facturas-proveedores-detalles', facturas_proveedores_detalles.getAll);

facturasProveedoresDetallesRoutes.get('/factura-proveedor-detalle/:id', facturas_proveedores_detalles.getById);

facturasProveedoresDetallesRoutes.post('/facturas-proveedores-detalles',
    authMiddleware(['caja']),
    checkMiddleWare(['id_factura_proveedor','id_producto', 'cantidad','precio_compra', 'subtotal']),
    facturas_proveedores_detalles.crear
);

facturasProveedoresDetallesRoutes.put('/factura-proveedor-detalle/:id', facturas_proveedores_detalles.update)

facturasProveedoresDetallesRoutes.delete('/factura-proveedor-detalle/:id', facturas_proveedores_detalles.delete)

export default facturasProveedoresDetallesRoutes;