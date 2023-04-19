import { validationResult } from "express-validator";
import { models } from "../models/models.js";

const {clientes} = models;

export const getAllClients =async (req,res)=>{
    try {
        const result =await clientes.findAll();
        res.json(result)
    } catch (error) {
        res.json(error.message).status(500)
    }
}

export const getCreateClient =async (req,res) => {
    try {
        const errors = validationResult(req);
        console.log(req.body)
        if(!errors.isEmpty()){
            const e = errors.array();
            return res.json(e.map((e, n) => {
                return {[`error ${n}`]: `${e.msg}`}
              })).status(400);
        }

        const {str_nombre,edad,str_direccion,str_ruc} = req.body;

        const result = await clientes.create({str_nombre,edad,str_direccion,str_ruc});

        res.json(result)

    } catch (error) {
        res.json(error.message).status(500)
    }
}