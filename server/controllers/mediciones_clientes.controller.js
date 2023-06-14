import {models} from "../models/models.js";
import {Cliente} from "./clientes.controller.js";
import {getDateNow} from "../tools/date.js";

const clientes = new Cliente();
const {mediciones_clientes} = models;

export class MedicionCliente {
    /**
     * Registra una nueva medicion de un cliente
     */
    crear = async (req, res) => {
        try {
            // destructura el objeto recibido, si recibe del body (req.body) o de una peticion de la api misma (req)
            const {body} = req;

            const {id_cliente} = body;

            if (!(await clientes.getById(id_cliente))) return res.status(404).json({error: "No existe un usuario con ese ID"});

            // Registramos la medicion
            const result = await mediciones_clientes
                .create({...body, date_fecha_medicion: getDateNow()})

            res.json(result);

        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
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
            await mediciones_clientes.update({activo:false, where: { id } });
            res.status(200).send("Medicion eliminada");
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    }

    /**
     * Lista todas las mediciones registradas
     */
    getAll = async (req, res) => {
        try {
            const result = await mediciones_clientes.findAll({ where: { activo: true } });
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
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    }

    getMedicionesDeCliente = async (req, res) => {
        try {
            const {id_cliente} = req.params;
            const result = await mediciones_clientes.findAll({where: {id_cliente}});
            if (!result) return res.status(404).json({error: "No existe un registro de medicion del usuario o no existe el usuario"});
            return res.json(result);
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    }

    getById = async (id) => {
        try {
            const result = await mediciones_clientes.findOne({where: {id}});
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}
