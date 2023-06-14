import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { Pago } from "../services/pago.js";
const pagosRoutes = Router();
const pagosController = new Pago();
pagosRoutes.post(
    "/pagos",
    authMiddleware(['caja']),
    checkMiddleWare(['id_factura_proveedor','date_fecha','total','detalles']),
    pagosController.crear
);
export default pagosRoutes;
