import { models } from "../models/models.js";

const { proveedores, facturas_proveedores } = models;
export class Facturas_proveedores {
    crear = async (req, res) => {
        try {
            const { body } = req;
            const { id_proveedor, date_fecha, total } = body;

            const proveedorExistente = await this.getProveedorById(id_proveedor);
            if (!proveedorExistente) {
                return res.status(404).json({ error: "No existe un proveedor con ese ID" });
            }

            const result = await this.createFacturaProveedor(id_proveedor, date_fecha, total);
            res.json(result);
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    };

    getProveedorById = async (id) => {
        try {
            const proveedor = await proveedores.findOne({ where: { id } });
            return proveedor;
        } catch (error) {
            throw new Error("Error al obtener la factura-proveedor");
        }
    }


    createFacturaProveedor = async (id_proveedor, date_fecha, total) => {
        try {
            const result = await facturas_proveedores.create({ id_proveedor, date_fecha, total });
            return result;
        } catch (error) {
            throw new Error("Error al crear la factura-proveedor");
        }
    }
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;
            const [rowsAffected] = await facturas_proveedores.update({ ...body }, { where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No se actualizó ninguna factura-proveedor");
            }
            res.status(200).send("factura-proveedor actualizada");
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const rowsAffected = await facturas_proveedores.destroy({ where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No existe una factura-proveedor con ese ID");
            }
            res.status(200).send("Arqueo Eliminado");
        } catch (error) {
            return res.status(500).json(error);
        }
    };
    getAll = async (req, res) => {
        try {
            const { ordenTotal, ordenFecha,startDate,endDate, ...querys } = req.query;

            const where = {
                ...querys
            };

            let options = {};
            if (ordenTotal == 'asc') options.order = [['total', 'ASC']];
            if (ordenTotal == 'desc') options.order = [['total', 'DESC']];
            if (ordenFecha == 'asc') options.order = [['date_fecha', 'ASC']];
            if (ordenFecha == 'desc') options.order = [['date_fecha', 'DESC']];
            // Add date range filtering
            if (startDate && endDate) { where.date_fecha = { [Op.between]: [new Date(startDate), new Date(endDate)] }; }

            const result = await facturas_proveedores.findAll({ where, ...options }) || facturas_proveedores.findAll({ where });

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            console.log("Se busca el  id");
            const result = await facturas_proveedores.findOne({ where: { id } });

            if (!result) {
                return res.status(404).json("No se encontró una factura-proveedor con ese ID");
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
    }
}
