import {validationResult} from "express-validator";
import {models} from "../models/models.js";
import {getDateNow, toDate} from "../tools/date.js";
import {bodyValidator} from "../tools/bodyValidator.js";
import {Clientes} from "./clientes.controller.js";
import {getNombreModalidad} from "./tipos_modalidades_de_pagos.js";

const {planes_de_pagos} = models;

const clientes = new Clientes();

/*
Creamos un nuevo plan
*/
export const crearPlanDePago = async (req, res) => {
    try {
        // Verificamos si todos los campos estan
        const validator = bodyValidator(req);
        if (validator) return res.status(400).json(validator)

        // destructuramos
        const {body} = req;

        const {cliente_id} = body;

        if (!(await clientes.getById(cliente_id))) return res.status(404).json({error: "No existe un usuario con ese ID"});
        // Verificamos que el usuario ya no tenga un plan de pago
        if (await getPlanPagoCliente(cliente_id)) return res.status(409).json({error: "El cliente ya posee un plan de pago"});

        // Obtenemos el nombre del cliente
        const {str_nombre} = await clientes.getById(cliente_id);
        const str_modalidad = await getNombreModalidad(tipo_modalidad_de_pago_id);
        const result = await planes_de_pagos.create({
            ...body,
            estado_de_pago: "pendiente",
            date_fecha_de_vencimiento: toDate(date_fecha_de_vencimiento),
            date_fecha_de_pago: null,
            date_fecha_de_de_registro: getDateNow(),
            date_fecha_de_actualizacion: getDateNow()
        });

        res.json(result)
    } catch (error) {
        res.status(500).json(error);
    }
};

// Devuelve todos los planes de pago registrados
export const getAllPlanesDePagos = async (req, res) => {
    try {
        const result = await planes_de_pagos.findAll();
        res.json(result);
    } catch (error) {
        res.json(error.message).status(500);
    }
};

// Obtiene un plan de pago consultando por su ID
export const getPlanDePagoByID = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await planes_de_pagos.findOne({where: {id}});
        if (!result) return res.status(404).json('No existe un plan de pago con ese ID')
        res.json(result)
    } catch (error) {
        res.json(error).status(500);
    }
}

export const getPlanPagoClienteByParams = async (req, res) => {
    try {
        const {cliente_id} = req.params;
        const result = await getPlanPagoCliente(cliente_id);
        if (!result) return res.status(404).json({error: "No se encuentra un plan de pago con ese id de cliente"})
        res.json(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

// Devuelve un objeto si es que el usuario ya posee un plan de pago
export const getPlanPagoCliente = async (cliente_id) => {
    try {
        const result = await planes_de_pagos.findOne({where: {cliente_id}});
        return result;
    } catch (error) {
        throw new Error("Error al obtener plan de pago del cliente")
    }
}