import { Router } from "express";
import { check } from "express-validator";

import {
  getClientes,
  crearCliente,
  getClienteByParams,
} from "../controllers/clientes.controller.js";

import { getPlanPagoClienteByParams } from "../controllers/planes_de_pagos.controller.js";

import { getMedicionesDeCliente } from "../controllers/mediciones_clientes.controller.js";

const clientesRoutes = Router();

// Obtenemos todos los clientes
clientesRoutes.get("/clientes", getClientes);

// Obtenemos cliente por parametro id
clientesRoutes.get("/cliente/:id", getClienteByParams);

// Crear un nuevo cliente, los checks sirven para comprobar que los campos esten completos
clientesRoutes.post(
  "/clientes",
  [
    check("str_nombre", "str_nombre es un campo requerido").notEmpty(),
    check("edad", "edad es un campo requerido").notEmpty(),
    check("str_direccion", "str_direccion es un campo requerido").notEmpty(),
    check("str_ruc", "str_ruc es un campo requerido").notEmpty(),
  ],
  crearCliente
);

// Obtener el plan de pago del cliente
clientesRoutes.get(
  "/cliente/:cliente_id/plan-de-pago",
  getPlanPagoClienteByParams
);

// Obtener la medicion del cliente
clientesRoutes.get(
  "/cliente/:cliente_id/medicion-cliente",
  getMedicionesDeCliente
);

export default clientesRoutes;
