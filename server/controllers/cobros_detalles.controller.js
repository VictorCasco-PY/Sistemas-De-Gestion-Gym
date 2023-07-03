import { models } from "../models/models.js";

const { cobros_detalles } = models;

export class CobrosDetalles {

    crear = async (id_cobro, values) => {
        try {
            console.log('cobro detalles');
            await values.forEach(async (field) => await cobros_detalles.create({ id_cobro, ...field }))

            return true;
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    getAll = async (req, res) => {
        try {
          const { id_cobro, id_forma_de_pago,  ...querys } = req.query;
    
          const where = {
            activo:true,
            ...querys
          };
          
          let options = {}; 
          if (id_cobro) where.id_cobro = id_cobro;
          if (id_forma_de_pago) where.id_forma_de_pago = id_forma_de_pago;
    
          const result = await cobros_detalles.findAll({ where, ...options }) || cobros_detalles.findAll({ where });
    
          res.json(result);
        } catch (error) {
          res.status(500).json({error: error.message});
        }
      };

}