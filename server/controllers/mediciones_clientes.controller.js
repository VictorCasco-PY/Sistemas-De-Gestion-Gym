import {models} from "../models/models.js";
import {bodyValidator} from "../tools/bodyValidator.js";
import {getClienteByID} from "./clientes.controller.js";
import {getDateNow} from "../tools/date.js";

const {mediciones_clientes} = models;

/**
 * Registra una nueva medicion de un cliente
 */
export const crearMedicionCliente = async (req, res) => {
    try {

        const validator = await bodyValidator(req);
        if(validator) return res.status(400).json(validator);

        // destructura el objeto recibido, si recibe del body (req.body) o de una peticion de la api misma (req)
        const {
            entrenador_id, cliente_id, peso, altura,
            cintura, piernas, porcentaje_masa_corporal
        } = req.body;

        if(!(await getClienteByID(cliente_id))) return res.status(404).json({error: "No existe un usuario con ese ID"});

        // Registramos la medicion
        const result = await mediciones_clientes.create({
            entrenador_id,
            cliente_id,
            peso,
            date_fecha_medicion: getDateNow(),
            altura,
            cintura,
            piernas,
            porcentaje_masa_corporal
        })

        res.json(result);

    } catch (e) {
        res.json({e})
    }
}

/**
 * Lista todas las mediciones registradas
 */
export const getMediciones = async (req,res) =>{
    try{
        const result = await mediciones_clientes.findAll();
        res.json(result);
    }catch (e){
        return res.status(500).json({error: "Error al obtener mediciones"});
    }
}

export const getMedicionesDeCliente = async(req,res)=>{
    try {
        const {cliente_id} = req.params;
        const result = await mediciones_clientes.findOne({where: {cliente_id}});
        if(!result) return res.status(404).json({error:"No existe un registro de medicion del usuario o no existe el usuario"});
        return res.json(result);
    } catch (error) {
        res.status(500).json(error)
    }
}