import {Router} from "express"
import {check} from "express-validator";
import {StockProductos} from "../controllers/stock_productos.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const stock_productos = new StockProductos();

const stockProductosRoutes = Router();

stockProductosRoutes.get('/stock-productos', stock_productos.getAll);

stockProductosRoutes.get('/stock-producto/:id', stock_productos.getByParams);

stockProductosRoutes.post(
    "/stock-productos",
    authMiddleware(['caja', 'entrenador']),
    checkMiddleWare(["id_producto", "id_stock", "cantidad",]),
    stock_productos.crear
  );

stockProductosRoutes.put('/stock-producto/:id', stock_productos.update)

stockProductosRoutes.delete('/stock-producto/:id', stock_productos.delete)

export default stockProductosRoutes;