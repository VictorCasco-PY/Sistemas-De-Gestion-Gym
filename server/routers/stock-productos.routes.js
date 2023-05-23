import {Router} from "express"
import {check} from "express-validator";
import {StockProductos} from "../controllers/stock_productos.controller.js";

const stock_productos = new StockProductos();

const stockProductosRoutes = Router();

stockProductosRoutes.get('/stock-productos', stock_productos.getAll);

stockProductosRoutes.get('/stock-producto/:id', stock_productos.getByParams);

stockProductosRoutes.post('/stock-productos', [
    check("id_producto", "id_producto  es un campo requerido").notEmpty(),
    check("id_stock", "id_stock  es un campo requerido").notEmpty(),
    check("cantidad", "cantidad  es un campo requerido").notEmpty(),
    ], stock_productos.crear);

stockProductosRoutes.put('/stock-producto/:id', stock_productos.update)

stockProductosRoutes.delete('/stock-producto/:id', stock_productos.delete)

export default stockProductosRoutes;