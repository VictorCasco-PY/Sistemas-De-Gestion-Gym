import { models } from "../models/models.js";

const { cajas } = models;

export class Cajas {
  crear = async (req, res) => {
    try {
      const { body } = req;
      const { str_nombre } = body;
      if (await this.getByNombre({ str_nombre })) return res.status(409).json({ error: "La caja ya esta registrada" });
      const result = await cajas.create({ ...body });
      res.json(result);
    } catch (error) {
      return res.json(error);
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const [rowsAffected] = await cajas.update({ ...body }, { where: { id } });
      if (rowsAffected === 0) return res.status(404).json("No se actualizo ninguna caja");
      res.status(200).send("Caja Actualizada");
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error })
    }

  }
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      if (!await this.getById(id)) return req.status(404).json({ error: "No existe una caja con ese ID" });
      await cajas.update({activo:false}, {where: { id } });
      res.status(200).send("Caja Eliminada");
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  getAll = async (req, res) => {
    try {
      const result = await cajas.findAll({ where: { activo: true } });
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

  getByNombre = async (str_nombre) =>{
    try{
      const result = await cajas.findOne({where: {str_nombre}});
      return result;
    }catch(error){
      return null;
    }
  }

  getById = async (id) => {
    try {
      const result = await cajas.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw new Error("Error al obtener caja");
    }
  }
}
