import { Router } from "express";
import { check } from "express-validator";

import { Cajas } from "../controllers/cajas.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";



const cajas = new Cajas();

const cajasRoutes = Router();

// Obtenemos todos los cajas
cajasRoutes.get("/cajas", cajas.getAll);

// Obtenemos producto por parametro id
cajasRoutes.get("/caja/:id", cajas.getByParams);

// Crear un nuevo producto, los checks sirven para comprobar que los campos esten completos
cajasRoutes.post(
    "/cajas",
    authMiddleware(['caja'])
    ,checkMiddleWare(['str_nombre']),
    cajas.crear
);


cajasRoutes.put("/caja/:id", cajas.update)
cajasRoutes.delete("/caja/:id", cajas.delete)

export default cajasRoutes;
