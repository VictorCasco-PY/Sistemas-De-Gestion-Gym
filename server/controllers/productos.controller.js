import { models } from "../models/models.js";
import { bodyValidator } from "../tools/bodyValidator.js";

const { productos } = models;

export class Productos {
  crear = async (req, res) => {
    try {
      const validator = bodyValidator(req);
      if (validator) return res.status(400).json(validator);
      const {body} = req;
      const {str_nombre} = body;
      if (await this.getByNombre({str_nombre})) return res.status(409).json({error: "El producto ya esta registrado"});
      const result = await productos.create({...body});
      res.json(result);
    } catch (error) {
      return res.json(error);
    }
  };
  update = async (req, res) => {
    try {
        const {id} = req.params;
        const {body} = req;
        const [rowsAffected] = await productos.update({...body}, {where: {id}});
        if (rowsAffected === 0) return res.status(404).json("No se actualizo ningun producto");
        res.status(200).send("Producto Actualizado");
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }

  }
  delete = async (req, res) => {
    try {
        const {id} = req.params;
        if (!(await this.getById(id))) return req.status(404).json({error: "No existe un producto con ese ID"});
        await clientes.destroy({where: {id}});
        res.status(200).send("Producto eliminado");
    } catch (error) {
        return res.status(500).json(error)
    }
  }
  getAll = async (req, res) => {
    try {
        const result = await productos.findAll();
        res.json(result);
    } catch (error) {
        res.json(error.message).status(500);
    }
  }
  getByParams = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await this.getById(id);
        return res.json(result);
    } catch (error) {
        res.json(error).status(500);
    }
  }
  getById = async (id) => {
    try {
        const result = await productos.findOne({where: {id}});
        return result;
    } catch (error) {
        throw new Error("Error al obtener producto");
    }
  }
}
