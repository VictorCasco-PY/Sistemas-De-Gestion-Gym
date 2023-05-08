import { Router } from "express";
import { check } from "express-validator";

import { Productos } from "../controllers/productos.controller.js";



const productos = new Productos();

const productosRoutes = Router();

// Obtenemos todos los clientes
productosRoutes.get("/productos", productos.getAll);

// Obtenemos cliente por parametro id
productosRoutes.get("/producto/:id", productos.getByParams);

// Crear un nuevo cliente, los checks sirven para comprobar que los campos esten completos
productosRoutes.post(
    "/productos",
    [
        check("str_nombre", "str_nombre es un campo requerido").notEmpty(),
        check("str_descripcion", "str_descripcion es un campo requerido").notEmpty(),
        check("precio", "precio es un campo requerido").notEmpty(),
        check("iva", "iva es un campo requerido").notEmpty(),
        check("str_codigo", "str_codigo es un campo requerido").notEmpty(),
    ],
    productos.crear
);

productosRoutes.put("/producto/:id", productos.update)
productosRoutes.delete("/producto/:id", productos.delete)

export default productosRoutes;
