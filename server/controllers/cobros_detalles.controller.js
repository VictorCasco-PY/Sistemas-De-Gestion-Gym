import {models} from "../models/models.js";

const {cobros_detalles} = models;

export class CobrosDetalles{

    crear = async (id_cobro, values) => {
        try{
            console.log('cobro detalles');
            await values.forEach(async (field) => await cobros_detalles.create({id_cobro,...field}))

            return true;
        }catch (error){
            console.log(error.message);
            throw new Error(error.message);
        }
    }

}