import {models} from "../models/models.js";
import {bodyValidator} from "../tools/bodyValidator.js";

const {cobros} = models;

export class Clase {
    crear = async (req, res) => {
        try {
            const validator = bodyValidator(req);
            if (validator) return res.status(400).json(validator);
            const {body} = req;
            const result = await cobros.create({...body});
            res.json(result);
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    update = async (req, res) => {
        try {
            const {id} = req.params;
            const {body} = req;
            const [rowsAffected] = await cobros.update({...body}, {where: {id}});
            if (rowsAffected === 0) return res.status(404).json({error: "No se ha modificado ningun cobro"});
            res.send("Cobro actualizado");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    delete = async (req, res) => {
        try{
            const {id}
        }catch (error){
            res.status(500).send(error.message);
        }
    }
    getAll = async (req, res) => {
    }

    getByParams = async (req, res) => {
    } // obtiene por id

    getById = async (id) => {
    }
}