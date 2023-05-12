import { models } from "../models/models.js";
import {bodyValidator} from "../tools/bodyValidator.js";

const {facturas} = models;

export class Factura {
    crear = async (req,res)=>{
        try{
            const {body} = req;
            const result = await facturas.create({...body});
            return res.json(result)
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    update = async (req,res)=>{
        try{
            const {id} = req.params;
            const {body} = req;
            const [rowsAffected] = await facturas.update({...body}, {where:id});
            if(rowsAffected===0) return res.status(404).send("No se actualizo nignuna facutra");
            res.send("Factura actualizada")
        }catch(error){
            return res.status(500).send(error.message);
        }
    }
    
    delete = async(req,res)=>{
        try {
            const {id} = req.params;
            if(!(await this.getById(id))) return res.status(404).send("No existe una factura con ese id");
            await facturas.destroy({where:{id}});
            return res.send("Factura eliminada correctamente");
        } catch (error) {
            return res.status(505).send(error.message)
        }
    }
    
    getAll = async(req,res)=>{}
    
    getByParams = async(req,res)=>{} // obtiene por id
    
    getById = async(id)=>{
        try {
            const result = await facturas.findOne({where:{id}});
            return result;
        } catch (error) {
            return null;
        }
    }
}