import {models} from "../models/models.js";
import {bodyValidator} from "../tools/bodyValidator.js";
import {Clientes} from "./clientes.controller.js";
import {getDateNow} from "../tools/date.js";

const clientes = new Clientes();
const {mediciones_clientes} = models;

export class MedicionesClientes {
    /**
     * Registra una nueva medicion de un cliente
     */
    crear = async (req, res) => {
        try {

            const validator = await bodyValidator(req);
            if (validator) return res.status(400).json(validator);

            // destructura el objeto recibido, si recibe del body (req.body) o de una peticion de la api misma (req)
            const {body} = req;

            const {cliente_id} = body;

            if (!(await clientes.getById(cliente_id))) return res.status(404).json({error: "No existe un usuario con ese ID"});

            // Registramos la medicion
            const result = await mediciones_clientes
                .create({...body, date_fecha_medicion: getDateNow()})

            res.json(result);

        } catch (e) {
            res.json({e})
        }
    }

    update = async (req, res) => {
        try {
            const {id} = req.params;
            const {body} = req;
            const [rowsAffected] = await clientes.update({...body}, {where: {id}});
            if (rowsAffected === 0) return res.status(404).json("No se actualizo ninguna medicion");
            res.status(200).send("Medicion actualizada");
        } catch (error) {
            console.log(error)
            return res.status(500).json({error})
        }
    }

    delete = async (req, res) => {
        try {
            const {id} = req.params
            if (!(await this.getById(id))) return req.status(404).json({error: "No existe esa medicion"});
            await mediciones_clientes.destroy({where: {id}});
            res.status(200).send("Medicion eliminada");
        } catch (error) {
            res.status(500).json(error);
        }
    }

    /**
     * Lista todas las mediciones registradas
     */
    getAll = async (req, res) => {
        try {
            const result = await mediciones_clientes.findAll();
            res.json(result);
        } catch (e) {
            return res.status(500).json({error: "Error al obtener mediciones"});
        }
    }

    getByParams = async (req, res) => {
        try {
            const {id} = req.params;
            const result = await mediciones_clientes.findOne({where: {id}});
            if (!result) res.status(404)
            res.json(result);
        } catch (error) {
            res.status(500).json({error})
        }
    }

    getMedicionesDeCliente = async (req, res) => {
        try {
            const {cliente_id} = req.params;
            const result = await mediciones_clientes.findAll({where: {cliente_id}});
            if (!result) return res.status(404).json({error: "No existe un registro de medicion del usuario o no existe el usuario"});
            return res.json(result);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    getById = async (id) => {
        try {
            const result = await mediciones_clientes.findOne({where: {id}});
            return result;
        } catch (error) {
            return {error: "Algo salio mal"};
        }
    }

}
