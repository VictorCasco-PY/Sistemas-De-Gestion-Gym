import { models } from "../models/models.js";
import { Op } from "sequelize"; // Agrega esta importación
import { getDateNow } from "../tools/date.js"
import { Facturas_proveedores } from "./facturas_proveedores.controller.js";
const { pagos_proveedores } = models;
const factura_proveedor = new Facturas_proveedores();


export class Pagos_proveedores {
    crear = async (req, res) => {
        try {
            const { body } = req;
            const result = await this.createPagoProveedor(...body);
            return res.json({ result });
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    };



    createPagoProveedor = async (query) => {
        try {
            const { id_factura_proveedor } = query;
            const result = await pagos_proveedores.create({ ...query, id_factura_proveedor });
            return result;
        } catch (error) {
            throw new Error("Error al crear la factura-proveedor");
        }
    }
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;
            const [rowsAffected] = await pagos_proveedores.update({ ...body }, { where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No se actualizó ningun pago-proveedor");
            }
            res.status(200).send("pago-proveedor actualizado");
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const rowsAffected = await pagos_proveedores.update({ activo: false }, { where: { id } });
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

            const result = await pagos_proveedores.findAll({ where, ...options }) || pagos_proveedores.findAll({ where });

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            console.log("Se busca el  id");
            const result = await pagos_proveedores.findOne({ where: { id } });

            if (!result) {
                return res.status(404).json("No se encontró una pago-proveedor con ese ID");
            }

            return result;
        } catch (error) {
            throw Error(error.message);
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
