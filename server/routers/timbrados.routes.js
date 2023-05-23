import { Router } from "express";
import { check } from "express-validator";

import { Timbrados } from "../controllers/timbrados.controller.js";



const timbrados = new Timbrados();

const timbradosRoutes = Router();

// Obtenemos todos los timbrados
timbradosRoutes.get("/timbrados", timbrados.getAll);

// Obtenemos timbrado por parametro id
timbradosRoutes.get("/timbrado/:id", timbrados.getByParams);

// Crear un nuevo timbrado, los checks sirven para comprobar que los campos esten completos
timbradosRoutes.post(
    "/timbrados",
    [
        check("str_timbrado", "str_timbrado es un campo requerido").notEmpty(),
        check("date_inicio_timbrado", "date_inicio_timbrado es un campo requerido").notEmpty(),
        check("date_fin_timbrado", "date_fin_timbrado es un campo requerido").notEmpty(),
    ],
    timbrados.crear
);

timbradosRoutes.put("/timbrado/:id", timbrados.update)
timbradosRoutes.delete("/timbrado/:id", timbrados.delete)

export default timbradosRoutes;
