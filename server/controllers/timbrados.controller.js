import { models } from "../models/models.js";

const { timbrados } = models;

export class Timbrados {
  crear = async (req, res) => {
    try {
      const { body } = req;
      const { str_timbrado } = body;
      if (await this.getByTimbrado({ str_timbrado })) return res.status(409).json({ error: "El timbrado ya esta registrado" });
      const result = await timbrados.create({ ...body });
      res.json(result);
    } catch (error) {
      return res.json(error);
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const [rowsAffected] = await timbrados.update({ ...body }, { where: { id } });
      if (rowsAffected === 0) return res.status(404).json("No se actualizo ningun timbrado");
      res.status(200).send("Timbrado Actualizado");
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error })
    }

  }
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      if (!(await this.getById(id))) return req.status(404).json({ error: "No existe un timbradp con ese ID" });
      await timbrados.update({activo:false, where: { id } });
      res.status(200).send("timbrado eliminado");
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  getAll = async (req, res) => {
    try {
      const result = await timbrados.findAll({ where: { activo: true } });
      res.json(result);
    } catch (error) {
      res.json(error.message).status(500);
    }
  }
  getByParams = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.getById(id);
      return res.json(result);
    } catch (error) {
      res.json(error).status(500);
    }
  }
  getByTimbrado = async (str_nombre) =>{
    try{
      const result = await timbrados.findOne({where: {str_timbrado}});
      return result;
    }catch(error){
      return null;
    }
  }
  getById = async (id) => {
    try {
      const result = await timbrados.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw new Error("Error al obtener timbrado");
    }
  }
}
