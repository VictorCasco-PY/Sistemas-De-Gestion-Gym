import { Router } from "express";
import { check } from "express-validator";

import { Proveedores } from "../controllers/proveedores.controller.js";

const proveedores = new Proveedores();

const proveedoresRoutes = Router();

// Obtenemos todos los proveedores
proveedoresRoutes.get("/proveedores", proveedores.getAll);

// Obtenemos proveedor por parametro id
proveedoresRoutes.get("/proveedor/:id", proveedores.getByParams);

// Crear un nuevo proveedor, los checks sirven para comprobar que los campos esten completos
proveedoresRoutes.post(
    "/proveedores",
    [
        check("str_nombre", "str_nombre es un campo requerido").notEmpty(),
        check("str_direccion", "str_direccion es un campo requerido").notEmpty(),
        check("str_telefono", "str_telefono es un campo requerido").notEmpty(),
        check("str_ruc", "str_ruc es un campo requerido").notEmpty(),
        check("str_correo", "str_correo es un campo requerido").notEmpty(),
    ],
    proveedores.crear
);

proveedoresRoutes.put("/proveedor/:id", proveedores.update)
proveedoresRoutes.delete("/proveedor/:id", proveedores.delete)

export default proveedoresRoutes;
