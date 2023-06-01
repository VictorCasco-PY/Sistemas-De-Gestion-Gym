import { models } from "../models/models.js";
import {Cliente} from "./clientes.controller.js";

const cliente = new Cliente();
const {facturas} = models;

export class Factura {
    crear = async (req,res)=>{
        try{         
            const {body} = req;
            const {id_cliente} = body;
            if(!(await cliente.getById(id_cliente))) return res.status(404).json({error:"No se ha encontrado un cliente con ese id"});
            const result = await facturas.create({...body});
            return res.json({...result, condicion:1});
        }catch(error){
            const {message} = error;
            return res.status(500).json({error:message});
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
            const {message} = error;
            return res.status(500).json({error:message});
        }
    }
    
    delete = async(req,res)=>{
        try {
            const {id} = req.params;
            if(!(await this.getById(id))) return res.status(404).send("No existe una factura con ese id");
            await facturas.destroy({where:{id}});
            return res.send("Factura eliminada correctamente");
        } catch (error) {
            const {message} = error;
            return res.status(500).json({error:message});
        }
    }
    
    getAll = async(req,res)=>{
        try{
            const result = await facturas.findAll();
            res.json(result);
        }catch(error){
            const {message} = error;
            return res.status(500).json({error:message});
        }
    }
    
    getByParams = async(req,res)=>{
        try{
            const {id} = req.params;
            const result = this.getById(id);
            if(!result) return res.status(404).json({error:"No existe una factura con ese id"});
            res.json(result);
        }catch(error){
            const {message} = error;
            return res.status(500).json({error:message});
        }
    } 

    // obtiene por id
    getById = async(id)=>{
        try {
            const result = await facturas.findOne({where:{id}});
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}