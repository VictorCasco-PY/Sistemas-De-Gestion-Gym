import { models } from "../models/models.js";

const { pagos_proveedores, sesiones_cajas, cobros } = models;


export const getArqueo = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await sesiones_cajas.findAll({
            include: [
                { 
                    model: pagos_proveedores,
                    attributes: [],
                    required: true
                },
                { 
                    model: cobros,
                    attributes: [],
                    required: true
                }
            ],
            where: { id },
            attributes: [
                [sequelize.literal('(SELECT SUM(total) FROM pagos_proveedores WHERE sesiones_cajas.id = pagos_proveedores.id_sesion_caja)'), 'totalPagos'],
                [sequelize.literal('(SELECT SUM(total) FROM cobros WHERE sesiones_cajas.id = cobros.id_sesion_caja)'), 'totalCobros']
            ]
        });

        const { totalPagos, totalCobros } = result[0].toJSON();
        const arqueo = totalCobros - totalPagos;

        res.json({ totalPagos, totalCobros, arqueo });
    } catch (error) {
        res.status(500).send(error.message);
    }
}