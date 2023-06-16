import { models } from "../models/models.js"
import { Proveedores } from "./proveedores.controller.js";
const { facturas_proveedores } = models;
const proveedor = new Proveedores();


export class Facturas_proveedores {
    crear = async (req, res) => {
        try {
            const { body } = req;
            const result = await this.createFacturaProveedor(...body);
            return res.json({ result });
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    };



    createFacturaProveedor = async (query) => {
        try {
            const { id_proveedor } = query;
            const proveedorTemp = await proveedor.getById(id_proveedor);
            if (!proveedorTemp) return res.status(404).json({ erorr: "No existe proveedor con ese id" });
            const { str_nombre } = proveedorTemp.str_nombre;
            const { str_ruc } = proveedorTemp.str_ruc;
            const result = await facturas_proveedores.create({ ...query, str_nombre, str_ruc});
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
            const rowsAffected = await facturas_proveedores.update({activo:false, where: { id } });
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
            const { ordenTotal, ordenFecha, startDate, endDate, ...querys } = req.query;

            const where = {
                activo:true,
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
    getById = async (id) => {
        try {
            console.log("Se busca el  id");
            const result = await facturas_proveedores.findOne({ where: { id } });

            if (!result) {
                return res.status(404).json("No se encontró una factura-proveedor con ese ID");
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
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
