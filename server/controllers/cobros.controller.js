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
            console.log("Error en crear un nuevo cobro")
            console.log(error.message);
            throw new Error(error.message);
        }
    }
    getAll = async (req, res) => {
        try {
            const { ordenTotal, ordenFecha, startDate, endDate, ...querys } = req.query;

            const where = {
                activo: true,
                ...querys
            };


            let options = {};
            if (ordenTotal == 'asc') options.order = [['total', 'ASC']];
            if (ordenTotal == 'desc') options.order = [['total', 'DESC']];
            if (ordenFecha == 'asc') options.order = [['date_fecha', 'ASC']];
            if (ordenFecha == 'desc') options.order = [['date_fecha', 'DESC']];
            // Add date range filtering
            if (startDate && endDate) {
                where.date_fecha = { [Op.between]: [new Date(startDate), new Date(endDate)] };

            }
            console.log(where);

            const result = await cobros.findAll({ where, ...options }) || cobros.findAll({ where });

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
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