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
  update = async (req, res) => {};
  delete = async (req, res) => {};
  getAll = async (req, res) => {};
  getByParams = async (req, res) => {};
  getById = async (req, res) => {};
  getByNombre= async (rq,res)=>{};
}
