import {models} from "../models/models.js";

const {cobros_detalles} = models;

export class CobrosDetalles{

    crear = async (id_cobro, values) => {
        try{
            const result = await cobros_detalles.create({id_cobro,...values});
            return result;
        }catch (error){
            throw new Error(error.message);
        }
    }

}