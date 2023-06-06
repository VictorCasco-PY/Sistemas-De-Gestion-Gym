import { models } from "../models/models.js";

const { productos, facturas_proveedores, facturas_proveedores_detalles } = models;
export class Facturas_proveedores_detalles {
    crear = async (req, res) => {
        try {
            const { body } = req;
            const { id_producto, id_factura_proveedor, cantidad, precio_compra, subtotal } = body;

            // Verificar si el producto
            const productoExistente = await this.getProductoById(id_producto);
            if (!productoExistente) {
                return res.status(404).json({ error: "No existe un producto con ese ID" });
            }

            // Verificar si la factura
            const facturaExistente = await this.getFacturaProveedor(id_factura_proveedor);
            if (!facturaExistente) {
                return res.status(404).json({ error: "No existe una  factura  con ese ID" });
            }

            const result = await this.createFacturaProveedorDetalle(id_factura_proveedor, id_producto, cantidad, precio_compra, subtotal);
            // Aumentar la cantidad del producto en la base de datos
            const nuevaCantidad = productoExistente.cantidad + cantidad;
            await this.updateCantidadProducto(id_producto, nuevaCantidad);
            res.json(result);
        } catch (error) {
            const { message } = error;
            return res.status(500).json({ error: message });
        }
    };

    getProductoById = async (id) => {
        try {
            const empleado = await productos.findOne({ where: { id } });
            return empleado;
        } catch (error) {
            throw new Error("Error al obtener el empleado");
        }
    }

    getFacturaProveedor = async (id) => {
        try {
            const caja = await facturas_proveedores.findOne({ where: { id } });
            return caja;
        } catch (error) {
            throw new Error("Error al obtener la factura proveedor");
        }
    }


    createFacturaProveedorDetalle = async (id_factura_proveedor, id_producto, cantidad, precio_compra, subtotal) => {
        try {
            const result = await facturas_proveedores_detalles.create({ id_factura_proveedor, id_producto, cantidad, precio_compra, subtotal });
            return result;
        } catch (error) {
            throw new Error("Error al crear la relación entre el producto y la factura");
        }
    }
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
            const rowsAffected = await facturas_proveedores_detalles.destroy({ where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No existe una relación factura-producto con ese ID");
            }
            res.status(200).send("Relación factura-producto eliminada");
        } catch (error) {
            return res.status(500).json(error);
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

            let where = {};
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
    // Función para actualizar la cantidad del producto
    updateCantidadProducto = async (id_producto, nuevaCantidad) => {
        try {
            await productos.update({ cantidad: nuevaCantidad }, { where: { id: id_producto } });
        } catch (error) {
            throw new Error("Error al actualizar la cantidad del producto");
        }
    };
}
