import { models } from "../models/models.js";
import { Productos } from "./productos.controller.js";

const { facturas_proveedores_detalles } = models;
const producto = new Productos()

export class Facturas_proveedores_detalles {
    crear = async (req, res) => {
        try {
            const { body } = req;
            const result = await this.createFacturaProveedorDetalle({ body });
            return res.json({ ...result });
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    };

    createFacturaProveedorDetalle = async (query) => {
        try {
            const { productos } = query;
            if (!productos)
                return { error: "Debes enviar productos" };
            let result = {};
            console.log(productos)
            // si hay productos, se intentan comprar
            if (productos && productos.length > 0) {
                // se crea una factura_proveedor_detalle para cada producto
                result.productos = await Promise.all(
                    productos.map(async (p) => {
                        if (await producto.getById(p.id)) {
                            await producto.comprar(p.id, p.cantidad);
                            p.id_producto = p.id;
                            delete p.id;
                            return await facturas_proveedores_detalles.create({ ...query, ...p });
                        }
                        return false;
                    })
                );
            }
            return result;
        } catch (error) {
            throw new Error("Error al crear la relación entre el producto y la factura");
        }
    };

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;
            const [rowsAffected] = await facturas_proveedores_detalles.update({ ...body }, { where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No se actualizó ninguna relación factura-producto");
            }
            res.status(200).send("Relación factura-producto actualizada");
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            if (!await this.getById(id))
                return res.status(404).send("No existe una factura_proveedor_detalle con ese id");
            await facturas_proveedores_detalles.update({activo:false}, {where: { id } });
            return res.send("Factura eliminada correctamente");
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    };
    getAll = async (req, res) => {
        try {
            const { str_nombre, cantidadOrden, subtotalOrden } = req.query;

            let options = {};
            if (cantidadOrden === 'asc') options.order = [['cantidad', 'ASC']];
            if (cantidadOrden === 'desc') options.order = [['cantidad', 'DESC']];
            if (subtotalOrden === 'asc') options.order = [['subtotal', 'ASC']];
            if (subtotalOrden === 'desc') options.order = [['subtotal', 'DESC']];

            let where = {activo:true};
            if (str_nombre) where = { str_nombre };

            const result = await facturas_proveedores_detalles.findAll({
                where,
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
            const result = await facturas_proveedores_detalles.findOne({ where: { id } });

            if (!result) {
                return res.status(404).json("No se encontró una relación factura-producto con ese ID");
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
