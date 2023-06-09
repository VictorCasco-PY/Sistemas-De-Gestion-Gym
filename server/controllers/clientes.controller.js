import {models} from "../models/models.js";
import {Op} from "sequelize";
import planes_de_pagos from "../models/planes_de_pagos.js";
import mediciones_clientes from "../models/mediciones_clientes.js";
const {clientes} = models;

export class Cliente {

    crear = async (req, res) => {
        try {
            const {body} = req;
            const {str_ruc} = body;

            if (await this.getByRuc({str_ruc})) return res.status(409).json({error: "El ruc ya esta registrado"});

            const result = await clientes.create({...body});

            res.json(result);
        } catch (error) {
            const {message} = error;
            return res.status(500).json({error:message});
        }
    };

    update = async (req, res) => {
        try {
            const {id} = req.params;
            const {body} = req;
            const [rowsAffected] = await clientes.update({...body}, {where: {id}});
            if (rowsAffected === 0) return res.status(404).json("No se actualizo ningun cliente");
            res.status(200).send("Cliente actualizado");
        } catch (error) {
            const {message} = error;
            return res.status(500).json({error:message});
        }

    }

    delete = async (req, res) => {
        try {
            const {id} = req.params;
            if (!(await this.getById(id))) return req.status(404).json({error: "No existe un usuario con ese ID"});
            await clientes.destroy({where: {id}});
            res.status(200).send("Cliente eliminado");
        } catch (error) {
            const {message} = error;
            return res.status(500).json({error:message});
        }
    }

    getAll = async (req, res) => {
        try {
            const {nombre, ...querys} = req.query;

            const where = {
                ...querys
              };

            if(nombre) where.str_nombre = {[Op.like]: `%${nombre}%`};

            const result = await clientes.findAll({where, include:{model:planes_de_pagos});
            return res.json(result);
        } catch (error) {
            const {message} = error;
            return res.status(500).json({error:message});
        }
    }

    getByParams = async (req, res) => {
        try {
            const {id} = req.params;
            const result = await this.getById(id);
            if(!result) res.status(404).send("No se ha encontrado un cliente con ese ID")
            return res.json(result);
        } catch (error) {
            const {message} = error;
            return res.status(500).json({error:message});
        }
    }

    getById = async (id) => {
        try {
            const result = await clientes.findOne({where: {id}, include:[{model:planes_de_pagos},{model:mediciones_clientes}]});
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    getByRuc = async (req) => {
        try {
            const {str_ruc} = req;
            const result = await clientes.findOne({where: {str_ruc}});
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}