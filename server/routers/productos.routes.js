import { Router } from "express";
import { check } from "express-validator";

import { Productos } from "../controllers/productos.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";



const productos = new Productos();

const productosRoutes = Router();

// Obtenemos todos los productos
productosRoutes.get("/productos", productos.getAll);

// Obtenemos producto por parametro id
productosRoutes.get("/producto/:id", productos.getByParams);

// Crear un nuevo producto, los checks sirven para comprobar que los campos esten completos
productosRoutes.post(
    "/productos",
    authMiddleware(['caja','entrenador']),
    checkMiddleWare(['str_nombre','str_descripcion','precio','iva','str_codigo']),
    productos.crear
);

productosRoutes.put("/producto/:id", productos.update)
productosRoutes.delete("/producto/:id", productos.delete)

export default productosRoutes;
