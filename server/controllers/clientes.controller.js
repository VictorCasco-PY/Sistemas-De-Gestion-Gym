import {models} from "../models/models.js";
import {bodyValidator} from "../tools/bodyValidator.js";

const {clientes} = models;

export class Cliente {

    crear = async (req, res) => {
        try {
            const validator = bodyValidator(req);
            if (validator) return res.status(400).json(validator);

            const {body} = req;
            const {str_ruc} = body;

            if (await this.getByRuc({str_ruc})) return res.status(409).json({error: "El ruc ya esta registrado"});

            const result = await clientes.create({...body});

            res.json(result);
        } catch (error) {
            return res.json(error);
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
            console.log(error)
            return res.status(500).json({error})
        }

    }

    delete = async (req, res) => {
        try {
            const {id} = req.params;
            if (!(await this.getById(id))) return req.status(404).json({error: "No existe un usuario con ese ID"});
            await clientes.destroy({where: {id}});
            res.status(200).send("Cliente eliminado");
        } catch (error) {
            return res.status(500).json(error)
        }
    }


    getAll = async (req, res) => {
        try {
            const result = await clientes.findAll();
            return res.json(result);
        } catch (error) {
            return res.json(error.message).status(500);
        }
    }

    getByParams = async (req, res) => {
        try {
            const {id} = req.params;
            const result = await this.getById(id);
            if(!result) res.status(404).send("No se ha encontrado un cliente con ese ID")
            return res.json(result);
        } catch (error) {
            return res.json(error).status(500);
        }
    }

    getById = async (id) => {
        try {
            const result = await clientes.findOne({where: {id}});
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getByRuc = async (req) => {
        try {
            const {str_ruc} = req;
            const result = await clientes.findOne({where: {str_ruc}});
            return result;
        } catch (error) {
            return {error: "Algo salio mal"};
        }
    }
}           return result;
        } catch (error) {
            return {error: "Algo salio mal"};
        }
    }
}