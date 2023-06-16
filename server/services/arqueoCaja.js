import { models } from "../models/models.js";
import Sequelize from 'sequelize';
const { pagos_proveedores, sesiones_cajas, cobros } = models;


export const getArqueo = async (req, res) => {
    try {
      const { id } = req.body;
      const result = await sesiones_cajas.findOne({
        include: [
          {
            model: pagos_proveedores,
            attributes: [
              [Sequelize.literal('COALESCE(SUM(pagos_proveedores.total), 0)'), 'totalPagos']
            ],
            required: true
          },
          {
            model: cobros,
            attributes: [
              [Sequelize.literal('COALESCE(SUM(cobros.total), 0)'), 'totalCobros']
            ],
            required: true
          }
        ],
        where: { id },
        attributes: []
      });
  
      if (!result) {
        // Handle the case where no results are found
        return res.status(404).json({ message: 'No arqueo found for the given ID' });
      }
  
      const { totalPagos, totalCobros } = result.toJSON();
      const arqueo = totalCobros - totalPagos;
  
      res.json({ totalPagos, totalCobros, arqueo });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  