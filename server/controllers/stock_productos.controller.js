import { models } from "../models/models.js";

const { productos, stocks, stocks_productos } = models;
export class StockProductos {
    crear = async (req, res) => {
        try {
            const { body } = req;
            const { id_producto, id_stock, cantidad } = body;

            // Verificar si el producto ya está registrado
            const productoExistente = await this.getProductoById(id_producto);
            if (!productoExistente) {
                return res.status(404).json({ error: "No existe un producto con ese ID" });
            }

            // Verificar si el stock ya está registrado
            const stockExistente = await this.getStockById(id_stock);
            if (!stockExistente) {
                return res.status(404).json({ error: "No existe un stock con ese ID" });
            }

            // Crear la relación entre el producto y el stock
            const result = await this.createStockProducto(id_producto, id_stock, cantidad);
            res.json(result);
        } catch (error) {
            const {message} = error;
            return res.status(500).json({error:message});
        }
    };

    // Obtener un producto por ID
    getProductoById = async (id) => {
        try {
            const producto = await productos.findOne({ where: { id } });
            return producto;
        } catch (error) {
            throw new Error("Error al obtener el producto");
        }
    }

    // Obtener un stock por ID
    getStockById = async (id) => {
        try {
            const stock = await stocks.findOne({ where: { id } });
            return stock;
        } catch (error) {
            throw new Error("Error al obtener el stock");
        }
    }

    // Crear una relación entre un producto y un stock
    createStockProducto = async (id_producto, id_stock, cantidad) => {
        try {
            const result = await stocks_productos.create({ id_producto, id_stock, cantidad });
            return result;
        } catch (error) {
            throw new Error("Error al crear la relación entre el producto y el stock");
        }
    }
    //Actualizar el stockProducto
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;
            const [rowsAffected] = await stocks_productos.update({ ...body }, { where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No se actualizó ninguna relación producto-stock");
            }
            res.status(200).send("Relación producto-stock actualizada");
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
    //Eliminar el stockProducto
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const rowsAffected = await stocks_productos.destroy({ where: { id } });
            if (rowsAffected === 0) {
                return res.status(404).json("No existe una relación producto-stock con ese ID");
            }
            res.status(200).send("Relación producto-stock eliminada");
        } catch (error) {
            return res.status(500).json(error);
        }
    };
    getAll = async (req, res) => {
        try {
            const result = await stocks_productos.findAll();
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    };
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await stocks_productos.findOne({ where: { id } });

            if (!result) {
                return res.status(404).json("No se encontró una relación producto-stock con ese ID");
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
