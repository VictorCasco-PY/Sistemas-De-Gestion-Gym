import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { Facturas_proveedores } from "../controllers/facturas_proveedores.controller.js";

const facturas_proveedores = new Facturas_proveedores();

const facturasProveedoresRoutes = Router();

facturasProveedoresRoutes.get('/facturas-proveedores', facturas_proveedores.getAll);

facturasProveedoresRoutes.get('/factura-proveedor/:id', facturas_proveedores.getByParams);

facturasProveedoresRoutes.post('/facturas-proveedores',
    authMiddleware(['caja']),
    checkMiddleWare(['id_proveedor','total']),
    facturas_proveedores.crear
);

facturasProveedoresRoutes.put('/factura-proveedor/:id', facturas_proveedores.update)

facturasProveedoresRoutes.delete('/factura-proveedor/:id', facturas_proveedores.delete)

export default facturasProveedoresRoutes;