import { Router } from "express";
import { check } from "express-validator";

import { Stocks } from "../controllers/stocks.controller.js";



const stocks = new Stocks();

const stocksRoutes = Router();

// Obtenemos todos los stocks
stocksRoutes.get("/stocks", stocks.getAll);

// Obtenemos stocks por parametro id
stocksRoutes.get("/stocks:id", stocks.getByParams);

// Crear un nuevo stocks los checks sirven para comprobar que los campos esten completos
stocksRoutes.post(
    "/stocks",
    [
        check("str_nombre", "str_nombre es un campo requerido").notEmpty(),
        check("str_direccion", "str_direccion es un campo requerido").notEmpty(),
    ],
    stocks.crear
);

stocksRoutes.put("/stocks:id", stocks.update)
stocksRoutes.delete("/stocks:id", stocks.delete)

export default stocksRoutes;
