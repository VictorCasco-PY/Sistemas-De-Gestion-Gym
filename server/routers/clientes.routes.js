import { Router } from "express";
import { check } from "express-validator";

import {Cliente} from "../controllers/clientes.controller.js";
import { PlanesDePagos } from "../controllers/planes_de_pagos.controller.js";
import {MedicionCliente} from "../controllers/mediciones_clientes.controller.js";


const clientes = new Cliente();
const medicionesClientes = new MedicionCliente();
const planesDePagos = new PlanesDePagos();
const clientesRoutes = Router();

// Obtenemos todos los clientes
clientesRoutes.get("/clientes", clientes.getAll);

// Obtenemos cliente por parametro id
clientesRoutes.get("/cliente/:id", clientes.getByParams);

// Crear un nuevo cliente, los checks sirven para comprobar que los campos esten completos
clientesRoutes.post(
  "/clientes",
  [
    check("str_nombre", "str_nombre es un campo requerido").notEmpty(),
    check("edad", "edad es un campo requerido").notEmpty(),
    check("str_direccion", "str_direccion es un campo requerido").notEmpty(),
    check("str_ruc", "str_ruc es un campo requerido").notEmpty(),
  ],
  clientes.crear
);

clientesRoutes.put("/cliente/:id", clientes.update)
clientesRoutes.delete("/cliente/:id", clientes.delete)

// Obtener el plan de pago del cliente
clientesRoutes.get(
  "/cliente/:id_cliente/plan-de-pago",
  planesDePagos.getPlanDePagoDeClienteByParams
);

// Obtener la medicion del cliente
clientesRoutes.get(
  "/cliente/:id_cliente/medicion-cliente",
  medicionesClientes.getMedicionesDeCliente
);

export default clientesRoutes;
