import { Router } from "express";

import { Cliente } from "../controllers/clientes.controller.js";
import { PlanesDePagos } from "../controllers/planes_de_pagos.controller.js";
import { MedicionCliente } from "../controllers/mediciones_clientes.controller.js";
import { checkMiddleWare } from "../middlewares/checkMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const clientes = new Cliente();
const medicionesClientes = new MedicionCliente();
const planesDePagos = new PlanesDePagos();
const clientesRoutes = Router();

/**
 * Obtiene todos los clientes
 */
clientesRoutes.get("/clientes", authMiddleware(['caja', 'entrenador']), clientes.getAll);

/**
 * Obtenemos cliente por parametro id
 */ 
clientesRoutes.get("/cliente/:id",  authMiddleware(['caja', 'entrenador']), clientes.getByParams);

/**
 * Crear un nuevo cliente, los checks sirven para comprobar que los campos esten completos
 */
clientesRoutes.post(
  "/clientes",
  authMiddleware(['caja', 'entrenador']),
  checkMiddleWare(["str_nombre", "edad", "str_direccion", "str_ruc"]),
  clientes.crear
);

clientesRoutes.put("/cliente/:id",  authMiddleware(['caja', 'entrenador']), clientes.update);
clientesRoutes.delete("/cliente/:id",  authMiddleware(['caja', 'entrenador']), clientes.delete);

/**
 * Obtener el plan de pago del cliente
 */
clientesRoutes.get(
  "/cliente/:id_cliente/plan-de-pago",
  authMiddleware(['caja']),
  planesDePagos.getPlanDePagoDeClienteByParams
);

/**
 * Obtener la medicion del cliente
 */
clientesRoutes.get(
  "/cliente/:id_cliente/medicion-cliente",
  authMiddleware(['entrenador']),
  medicionesClientes.getMedicionesDeCliente
);

export default clientesRoutes;
