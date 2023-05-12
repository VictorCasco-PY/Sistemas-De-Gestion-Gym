import {validationResult} from "express-validator";
import {models} from "../models/models.js";
import {getDateNow, toDate} from "../tools/date.js";
import {bodyValidator} from "../tools/bodyValidator.js";
import {Cliente} from "./clientes.controller.js";

import {TipoModalidadDePago} from "./tipos_modalidades_de_pagos.js";


const {planes_de_pagos} = models;

const tiposModalidadesDePagos = new TipoModalidadDePago();
const clientes = new Cliente();

export class PlanesDePagos {
    /*
    Creamos un nuevo plan
    */
    crear = async (req, res) => {
        try {
            // Verificamos si todos los campos estan
            const validator = bodyValidator(req);
            if (validator) return res.status(400).json(validator)

            const {body} = req;
            const {id_tipo_modalidad_de_pago} = body;
            const {id_cliente} = body;
            const str_modalidad = await tiposModalidadesDePagos.getNombreModalidad(id_tipo_modalidad_de_pago);


            if (!(await clientes.getById(id_cliente))) return res.status(404).json({error: "No existe un usuario con ese ID"});
            if (await this.getPlanPagoCliente(id_cliente)) {return res.status(409).json({error: "El cliente ya posee un plan de pago"});}

            const str_nombre_cliente = (await clientes.getById(id_cliente)).str_nombre;


            const result = await planes_de_pagos.create({
                ...body,
                str_modalidad,
                str_nombre_cliente,
                estado_de_pago: "pendiente",
                date_fecha_de_vencimiento: toDate(body.date_fecha_de_vencimiento),
                date_fecha_de_pago: null,
                date_fecha_de_de_registro: getDateNow(),
                date_fecha_de_actualizacion: getDateNow()
            });
                  

            
            res.json(result)
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    update = async (req, res) => {
        try {
            const {id} = body.params;
            const {body} = body.req;
            const {id_tipo_modalidad_de_pago} = body;
            const [rowsAffected] = await planes_de_pagos.update({...body}, {where: {id}});
            if (rowsAffected === 0) return res.status(404).json("No se actualizo ningun plan de pago");
            res.status(200).send("Plan actualizado")
        } catch (error) {
            res.status(500).json(error);
        }
    }

    updateClienteNombre = async(id_cliente, str_nombre_cliente) =>{
        try{
            const {id} = this.getPlanPagoCliente(id_cliente);
            const [rowsAffected] = await planes_de_pagos.update({str_nombre_cliente}, {where:{id}});
            if (rowsAffected === 0) return res.status(404).json("No se actualizo ningun plan de pago");
            res.status(200).send("Plan actualizado")
        }catch(error){
            return null;
        }
    }

    delete = async (req, res) => {
        try {
            const {id} = req.params;
            if (!(await this.getById(id))) return res.status(404).json({error: "No existe ese plan de pago"});
            await planes_de_pagos.destroy({where: {id}});
            res.status(200).send("Plan de pago eliminado");
        } catch (error) {
            console.log(error);
            res.status(500).json({error});
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
                const {id_cliente} = req.params;
                const result = await this.getPlanPagoCliente(id_cliente);
                if (!result) return res.status(404).json({error: "No se encuentra un plan de pago con ese id de cliente"})
                res.json(result)
            }catch (error){
                res.json(error).status(500);
            }
        }


    getPlanPagoCliente = async(id_cliente) => {
        try{
            const result = await planes_de_pagos.findOne({where:{id_cliente}});
            return result
        }catch(error){
            throw new Error("Error al obtener plan de pago")
        }
    }

    getById = async (id) => {
        try {
            
            const result = await planes_de_pagos.findOne({where: {id}});
            return result
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
