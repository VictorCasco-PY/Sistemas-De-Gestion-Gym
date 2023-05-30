import { Router } from "express";
import { check } from "express-validator";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { Stocks } from "../controllers/stocks.controller.js";



const stocks = new Stocks();

const stocksRoutes = Router();

// Obtenemos todos los stocks
stocksRoutes.get("/stocks", stocks.getAll);

// Obtenemos stocks por parametro id
stocksRoutes.get("/stocks/:id", stocks.getByParams);

// Crear un nuevo stocks los checks sirven para comprobar que los campos esten completos
stocksRoutes.post (
    "/stocks",
    authMiddleware(['caja', 'entrenador']),
    checkMiddleWare(["str_nombre", "str_direccion",]),
    stocks.crear
);

stocksRoutes.put("/stocks/:id", stocks.update)
stocksRoutes.delete("/stocks/:id", stocks.delete)

export default stocksRoutes;
