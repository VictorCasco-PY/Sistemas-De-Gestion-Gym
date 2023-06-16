import { Op } from "sequelize";
import { models } from "../models/models.js";
const { productos } = models;

export class Productos {
  crear = async (req, res) => {
    try {
      const { body } = req;
      const { str_nombre } = body;
      if (await this.getByNombre({ str_nombre })) return res.status(409).json({ error: "El producto ya esta registrado" });
      const result = await productos.create({ ...body });
      res.json(result);
    } catch (error) {
      return res.json(error);
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const [rowsAffected] = await productos.update({ ...body }, { where: { id } });
      if (rowsAffected === 0) return res.status(404).json("No se actualizo ningun producto");
      res.status(200).send("Producto Actualizado");
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error })
    }

  }
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      if (!await this.getById(id)) return req.status(404).json({ error: "No existe un producto con ese ID" });
      await productos.update({activo:false}, {where: { id } });
      res.status(200).send("Producto eliminado");
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  vender = async (id, cantidad) => {
    try{
      const producto = await this.getById(id);
      const newCantidad = producto.cantidad - cantidad;
      await productos.update({cantidad:newCantidad}, {where:{id}});
    }catch(error){
      throw new Error("Error a descontar producto en el stock");
    }
  }
  comprar = async (id, cantidad) => {
    try{
      const producto = await this.getById(id);
      const newCantidad = parseInt(producto.cantidad) + parseInt(cantidad);
      await productos.update({cantidad:newCantidad}, {where:{id}});
    }catch(error){
      throw new Error("Error al aumentar producto en el stock");
    }
  }

  // Devuelve todos los planes de pago registrados
  getAll = async (req, res) => {
    try {
      const { nombre, precio, ordenNombre,ordenPrecio,codigo, ...querys } = req.query;

      const where = {
        activo:true,
        ...querys
      };
      
      let options = {}; 
      if(ordenNombre=='asc') options.order = [['str_nombre', 'ASC']];
      if(ordenNombre=='desc') options.order = [['str_nombre', 'DESC']];
      if(ordenPrecio=='asc') options.order = [['precio', 'ASC']];
      if(ordenPrecio=='desc') options.order = [['precio', 'DESC']];
      if (nombre) where.str_nombre = { [Op.like]: `%${nombre}%` };
      if (precio) where.precio = precio;
      if(codigo) where.str_codigo=codigo;

      const result = await productos.findAll({ where, ...options }) || productos.findAll({ where });

      res.json(result);
    } catch (error) {
      res.status(500).json({error: error.message});
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

  getByNombre = async (str_nombre) =>{
    try{
      const result = await productos.findOne({where: {str_nombre}});
      return result;
    }catch(error){
      return null;
    }
  }

  getById = async (id) => {
    try {
      const result = await productos.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw new Error("Error al obtener producto");
    }
  }
}
