import { models } from "../models/models.js";
import { getDateNow } from "../tools/date.js";
import {Cliente} from "./clientes.controller.js";
import facturas_detalles from "../models/facturas_detalles.js";
import clientes from "../models/clientes.js";
const cliente = new Cliente();
const { facturas } = models;

export class Factura {
  crear = async (req, res) => {
    try {
      const { body } = req;
      const result = await this.nuevaFactura(...body);
      return res.json({ result });
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const [rowsAffected] = await facturas.update(
        { ...body },
        { where: { id } }
      );
      if (rowsAffected === 0)
        return res.status(404).send("No se actualizo nignuna facutra");
      res.send("Factura actualizada");
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      if (!(await this.getById(id)))
        return res.status(404).send("No existe una factura con ese id");
      await facturas.destroy({ where: { id } });
      return res.send("Factura eliminada correctamente");
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  nuevaFactura = async (query) => {
    try {
      const { id_cliente } = query;
      const date_fecha = getDateNow();
      const { str_nombre, str_ruc } = (await cliente.getById(id_cliente))
        .dataValues;
      if (!str_nombre)
        return res
          .status(404)
          .json({ error: "No se ha encontrado un cliente con ese id" });

      const result = await facturas.create({
        ...query,
        date_fecha,
        str_nombre_cliente: str_nombre,
        str_ruc_cliente: str_ruc,
      });

      return result;
    } catch (error) {
      throw new Error("Error facturas: " + error.message);
    }
  };

  getAll = async (req, res) => {
    try {
      const result = await facturas.findAll();
      res.json(result);
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  getByParams = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.getById(id);
      if (!result)
        return res
          .status(404)
          .json({ error: "No existe una factura con ese id" });
      res.json(result);
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
      
    getAll = async(req,res)=>{
        try{
            const result = await facturas.findAll({include:{model:facturas_detalles}, include:{model:clientes}});
            res.json(result);
        }catch(error){
            const {message} = error;
            return res.status(500).json({error:message});
        }
    }
  };

  // obtiene por id
  getById = async (id) => {
    try {
      const result = await facturas.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
}