import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { Venta } from "../services/venta.js";
const ventasRoutes = Router();
const ventaController = new Venta();
ventasRoutes.post(
    "/ventas",
    authMiddleware(['caja']),
    checkMiddleWare(['id_cliente','id_timbrado','total', 'saldo', 'iva_5', 'iva_10', 'iva_exenta','detalles']),
    ventaController.crear
);
export default ventasRoutes;
