import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { Compra } from "../services/compra.js";
const comprasRoutes = Router();
const compraController = new Compra();
comprasRoutes.post(
    "/compras",
    authMiddleware(['caja']),
    checkMiddleWare(['id_proveedor','total','detalles']),
    compraController.crear
);
export default comprasRoutes;
