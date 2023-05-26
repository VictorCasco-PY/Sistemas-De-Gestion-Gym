import { models } from "../models/models.js";
import { bodyValidator } from "../tools/bodyValidator.js";

const { facturas_detalles } = models;

export class FacturaDetalle {
  crear = async (req, res) => {
    try {
      const { body } = req;
      const result = await facturas_detalles.create({ ...body });
      return res.json(result);
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const [rowsAffected] = await facturas_detalles.update(
        { ...body },
        { where: { id } }
      );
      if (rowsAffected === 0)
        return res
          .status(404)
          .json({ error: "No se ha actualizado ningun detalle de factura" });
      res.send("factura_detalle actualizado");
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      if (!(await this.getById(id)))
        return res.status(404).send("No existe una factura_detalle con ese id");
      await facturas_detalles.destroy({ where: { id } });
      return res.send("Factura eliminada correctamente");
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  getAll = async (req, res) => {
    try {
      const result = await facturas_detalles.findAll();
      return result;
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  getByParams = async (req, res) => {
    try {
      const { id } = req.params;
      const result = this.getById(id);
      if (!result)
        return res
          .status(404)
          .json({ error: "No existe una factura con ese id" });
      res.json(result);
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  // obtiene por id
  getById = async (id) => {
    try {
      const result = await facturas_detalles.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
