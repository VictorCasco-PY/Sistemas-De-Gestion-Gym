import { Router } from "express";
import { check } from "express-validator";

import { Pagos_proveedores } from "../controllers/pagos.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";



const pagos = new Pagos_proveedores();

const pagosRoutes = Router();

// Obtenemos todos los pagos
pagosRoutes.get("/pagos", pagos.getAll);

// Obtenemos pago por parametro id
pagosRoutes.get("/pago/:id", pagos.getByParams);

// Crear un nuevo pago, los checks sirven para comprobar que los campos esten completos
pagosRoutes.post(
    "/pagos",
    authMiddleware(['caja','entrenador']),
    checkMiddleWare(['str_nombre','str_descripcion','precio','iva','str_codigo','cantidad']),
    pagos.crear
);

pagosRoutes.put("/pago/:id", pagos.update)
pagosRoutes.delete("/pago/:id", pagos.delete)

export default pagosRoutes;
