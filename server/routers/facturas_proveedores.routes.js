import {Router} from "express"
import {check} from "express-validator";

import { Facturas_proveedores } from "../controllers/facturas_proveedores.controller.js";

const facturas_proveedores = new Facturas_proveedores();

const facturasProveedoresRoutes = Router();

facturasProveedoresRoutes.get('/facturas-proveedores', facturas_proveedores.getAll);

facturasProveedoresRoutes.get('/factura-proveedor/:id', facturas_proveedores.getById);

facturasProveedoresRoutes.post('/facturas-proveedores', [
    check("id_proveedor", "id_proveedor  es un campo requerido").notEmpty(),
    check("date_fecha", "date_fecha  es un campo requerido").notEmpty(),
    check("total", "total  es un campo requerido").notEmpty(),
    ], facturas_proveedores.crear);

facturasProveedoresRoutes.put('/factura-proveedor/:id', facturas_proveedores.update)

facturasProveedoresRoutes.delete('/factura-proveedor/:id', facturas_proveedores.delete)

export default facturasProveedoresRoutes;