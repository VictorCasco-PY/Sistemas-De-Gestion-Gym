import { models } from "../models/models.js";
import { bodyValidator } from "../tools/bodyValidator.js";

const { productos } = models;

export class Clase {
  crear = async (req, res) => {
    const validator = bodyValidator(req);
    if (validator) return res.status(400).json(validator);

    const {body} = req;
    

  };
  update = async (req, res) => {};
  delete = async (req, res) => {};
  getAll = async (req, res) => {};
  getByParams = async (req, res) => {};
  getById = async (req, res) => {};
}
