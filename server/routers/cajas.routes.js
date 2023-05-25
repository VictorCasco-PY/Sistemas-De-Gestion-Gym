import { Router } from "express";
import { check } from "express-validator";

import { Cajas } from "../controllers/cajas.controller.js";



const cajas = new Cajas();

const cajasRoutes = Router();

// Obtenemos todos los cajas
cajasRoutes.get("/cajas", cajas.getAll);

// Obtenemos producto por parametro id
cajasRoutes.get("/caja/:id", cajas.getByParams);

// Crear un nuevo producto, los checks sirven para comprobar que los campos esten completos
cajasRoutes.post(
    "/cajas",
    [
        check("str_nombre", "str_nombre es un campo requerido").notEmpty(),
    ],
    cajas.crear
);

cajasRoutes.put("/caja/:id", cajas.update)
cajasRoutes.delete("/caja/:id", cajas.delete)

export default cajasRoutes;
