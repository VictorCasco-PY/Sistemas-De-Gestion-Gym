import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
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
    authMiddleware(['caja']),
    checkMiddleWare(['str_timbrado','date_inicio_timbrado','date_fin_timbrado']),
    timbrados.crear
);

timbradosRoutes.put("/timbrado/:id", timbrados.update)
timbradosRoutes.delete("/timbrado/:id", timbrados.delete)

export default timbradosRoutes;
