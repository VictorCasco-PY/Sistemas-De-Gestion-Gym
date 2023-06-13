import {models} from "../models/models.js";

const {cobros,cobros_detalles} = models;

export class Cobros {
    crear = async (req, res) => {
        try {
            const {body} = req;
            const result = await this.nuevoCobro(body);
            res.json(result);
        } catch (error) {
            const {message} = error;
            return res.status(500).json({error:message});
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
            const {message} = error;
            return res.status(500).json({error:message});
        }
    }
    delete = async (req, res) => {
        try{
            
        }catch (error){
            const {message} = error;
            return res.status(500).json({error:message});
        }
    }

    nuevoCobro = async (values) => {
        try {
            const result = await cobros.create({...values});
            return result;
        }catch (error){
            throw new Error(error.message);
        }

    }
    getAll = async (req, res) => {
    }

    getByParams = async (req, res) => {
    } // obtiene por id

    getById = async (id) => {
        try{
            const result = await cobros.findOne({where:{id}, include:{model:cobros_detalles}});
            return result;
        }catch (error){
            throw new Error(error.message);
        }
    }
}