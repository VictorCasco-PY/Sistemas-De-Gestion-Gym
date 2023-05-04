import {validationResult} from "express-validator";
import {models} from "../models/models.js";
import {getDateNow, toDate} from "../tools/date.js";
import {bodyValidator} from "../tools/bodyValidator.js";
import {Clientes} from "./clientes.controller.js";

import {TiposModalidadesDePagos} from "./tipos_modalidades_de_pagos.js";


const {planes_de_pagos} = models;

const tiposModalidadesDePagos = new TiposModalidadesDePagos();
const clientes = new Clientes();

export class PlanesDePagos {
    /*
    Creamos un nuevo plan
    */
    crear = async (req, res) => {
        try {
            // Verificamos si todos los campos estan
            const validator = bodyValidator(req);
            if (validator) return res.status(400).json(validator)

            // destructuramos
            const {body} = req;

            const {cliente_id} = body;

            const {tipo_modalidad_de_pago_id} = body;
            const cliente = await clientes.getById(cliente_id);
            const {str_nombre}= cliente;
            if (!(cliente)) return res.status(404).json({error: "No existe un usuario con ese ID"});
            // Verificamos que el usuario ya no tenga un plan de pago
            if (!(await this.getPlanPagoCliente(cliente_id))) {return res.status(409).json({error: "El cliente ya posee un plan de pago"});}
            // Obtenemos el nombre del cliente

            const str_modalidad = await tiposModalidadesDePagos.getNombreModalidad(tipo_modalidad_de_pago_id);
            const result = await planes_de_pagos.create({
                ...body,
                str_modalidad,
                str_nombre,
                estado_de_pago: "pendiente",
                date_fecha_de_vencimiento: toDate(body.date_fecha_de_vencimiento),
                date_fecha_de_pago: null,
                date_fecha_de_de_registro: getDateNow(),
                date_fecha_de_actualizacion: getDateNow()
            });
            console.log(result);
            res.json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    update = async (req, res) => {
        try {
            const {id} = body.params;
            const {body} = body.req;
            const {tipo_modalidad_de_pago_id} = body;
            const [rowsAffected] = await planes_de_pagos.update({...body}, {where: {id}});
            if (rowsAffected === 0) return res.status(404).json("No se actualizo ningun plan de pago");
            res.status(200).send("Plan actualizado")
        } catch (error) {
            res.status(500).json(error);
        }
    }

    delete = async (req, res) => {
        try {
            const {id} = body.params;
            if (!(await this.getById(id))) return res.status(404).json({error: "No existe ese plan de pago"});
            await planes_de_pagos.destroy({where: {id}});
            res.status(200).send("Plan de pago eliminado");
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Devuelve todos los planes de pago registrados
    getAll = async (req, res) => {
        try {
            const result = await planes_de_pagos.findAll();
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Obtiene un plan de pago consultando por su ID
    getByParams = async (req, res) => {
        try {
            const {id} = req.params;
            const result = await planes_de_pagos.findOne({where: {id}});
            if (!result) return res.status(404).json('No existe un plan de pago con ese ID')
            res.json(result)
        } catch (error) {
            res.json(error).status(500);
        }
    }

        // Devuelve un objeto si es que el usuario ya posee un plan de pago
    getPlanDePagoDeClienteByParams = async (req, res) => {
            try {
                const {cliente_id} = req.params;
                const result = await planes_de_pagos.findOne({where:{id}});
                if (!result) return res.status(404).json({error: "No se encuentra un plan de pago con ese id de cliente"})
                res.json(result)
            }catch (error){
                res.json(error).status(500);
            }
        }


    getPlanPagoCliente = async(cliente_id) => {
        try{
            const result = await planes_de_pagos.findOne({where:{cliente_id}});
            if (!result) return res.status(404).json({error: "No se encuentra un plan de pago con ese id de cliente"})
            return result
        }catch(error){
            return {error: "Algo salio mal"};
        }
    }



    getById = async (req, res) => {
        try {
            const result = await planes_de_pagos.findOne({where: {id}});

            res.json(result)
        } catch (error) {
            return {error: "Algo salio mal"}
        }
    }

}
