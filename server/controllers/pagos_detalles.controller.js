import { models } from "../models/models.js";

const { pagos_proveedores_detalles } = models;

export class Pagos_proveedores_detalles {
    crear = async (req, res) => {
        try {
            const { body } = req;
            const result = await this.createPagoProveedorDetalle({ body });
            return res.json({ ...result });
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    };

    createPagoProveedorDetalle = async (query) => {
        try {
            const result = await pagos_proveedores_detalles.create({ ...query,  });
            return result;
        } catch (error) {
            throw new Error("Error al crear la relación entre pago y sus detalles");
        }
    };

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;
            const [rowsAffected] = await pagos_proveedores_detalles.update({ ...body }, { where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No se actualizó ningun pago-detalles");
            }
            res.status(200).send("Relación pago-detalle actualizada");
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            if (!(await this.getById(id)))
                return res.status(404).send("No existe un pago_proveedor_detalle con ese id");
            await pagos_proveedores_detalles.update({ where: { id } });
            return res.send("detalle eliminada correctamente");
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    };
    getAll = async (req, res) => {
        try {
            const { montoOrden } = req.query;

            let options = {};
            if (montoOrden === 'asc') options.order = [['monto', 'ASC']];
            if (montoOrden === 'desc') options.order = [['monto', 'DESC']];

            let where = {};

            const result = await pagos_proveedores_detalles.findAll({
                ...options
            });

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            console.log("Se busca el  id");
            const result = await pagos_proveedores_detalles.findOne({ where: { id } });

            if (!result) {
                return res.status(404).json("No se encontró pago-proveedor con ese ID");
            }

            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    };
    getByParams = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.getById(id);
            return res.json(result);
        } catch (error) {
            res.json(error).status(500);
        }
    };
}
