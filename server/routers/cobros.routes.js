import { Router } from "express";
import { check } from "express-validator";

import { Cobros } from "../controllers/cobros.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";



const cobros = new Cobros();

const cobrosRoutes = Router();

// Obtenemos todos los cobros
cobrosRoutes.get("/cobros", cobros.getAll);

// Obtenemos cobro por parametro id
cobrosRoutes.get("/cobro/:id", cobros.getByParams);

// Crear un nuevo cobro, los checks sirven para comprobar que los campos esten completos
cobrosRoutes.post(
    "/cobros",
    authMiddleware(['caja','entrenador']),
    checkMiddleWare([]),
    cobros.crear
);

cobrosRoutes.put("/cobro/:id", cobros.update)
cobrosRoutes.delete("/cobro/:id", cobros.delete)

export default cobrosRoutes;
