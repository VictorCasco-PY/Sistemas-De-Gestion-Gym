import bcrypt from "bcrypt";
import {models} from "../models/models.js";
import {bodyValidator} from "../tools/bodyValidator.js";

const {empleados} = models;

export class Empleado {
    crear = async (req, res) => {
        try {
            const validator = bodyValidator(req);
            console.log(validator)
            if (validator) return res.status(400).json(validator);

            const {body} = req;
            const {str_cedula} = body;
            body.password = bcrypt.hashSync(body.password, 10);
            if (await this.getByCedula(str_cedula)) return res.status(400).json({error: "Ya existe un cliente con ese CI"});

            const result = await empleados.create({...body});

            res.json(result);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    update = async (req, res) => {
        try {
            const {id} = req.params;
            const {body} = req;
            const [rowsAffected] = await empleados.update({...body}, {where: {id}});
            if (rowsAffected === 0) return res.status(404).json("No se actualizo ningun empleado");
            res.status(200).send("Empleado actualizado");
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    delete = async (req, res) => {
        try {
            const {id} = req.params;
            if (!(await this.getById(id))) return res.status(404).json({error: "No existe un empleado con este id"});
            await empleados.destroy({where: {id}});
            res.status(200).send("Empleado eliminado");
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    getAll = async (req, res) => {
        try {
            const result = await empleados.findAll();
            const resultLimpio = result.map(empleado => {
                const { password, ...limpio } = empleado.get({ plain: true });
                return limpio;
            });
            res.json(resultLimpio);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    getByParams = async (req, res) => {
        try {
            const {id} = req.params;
            const result = await empleados.findOne({where: {id}});
            const {password, ...resultLimpio} = result.get({plain:true});
            return res.status(200).json(resultLimpio);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } // obtiene por id

    getById = async (id) => {
        try {
            const empleado = await empleados.findOne({where: {id}});
            return empleado;
        } catch (error) {
            return null;
        }
    }

    getByCedula = async (str_cedula) => {
        try {
            const empleado = await empleados.findOne({where: {str_cedula}});
            return empleado;
        } catch (error) {
            return null;
        }
    }
}