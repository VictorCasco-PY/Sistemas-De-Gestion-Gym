import { Router } from "express";

import { Proveedores } from "../controllers/proveedores.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const proveedores = new Proveedores();

const proveedoresRoutes = Router();

// Obtenemos todos los proveedores
proveedoresRoutes.get("/proveedores", proveedores.getAll);

// Obtenemos proveedor por parametro id
proveedoresRoutes.get("/proveedor/:id", proveedores.getByParams);

// Crear un nuevo proveedor, los checks sirven para comprobar que los campos esten completos
proveedoresRoutes.post(
  "/proveedores",
  checkMiddleWare([
    "str_nombre",
    "str_direccion",
    "str_telefono",
    "str_ruc",
    "str_correo",
  ]),
  proveedores.crear
);

proveedoresRoutes.put("/proveedor/:id", proveedores.update);
proveedoresRoutes.delete("/proveedor/:id", proveedores.delete);

export default proveedoresRoutes;
