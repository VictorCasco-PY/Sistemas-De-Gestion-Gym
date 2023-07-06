import { models } from "../models/models.js";
import { getDateNow } from "../tools/date.js";
import { Cliente } from "./clientes.controller.js";
import { Op } from "sequelize";
import facturas_detalles from "../models/facturas_detalles.js";
import productos from "../models/productos.js";
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
      await facturas.update({ activo: false }, { where: { id } });
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

      const ultimaFactura = await this.getUltimoID();

      let numero_factura = ultimaFactura || 0;

      numero_factura = numero_factura.toString().padStart(7, "0");

      const result = await facturas.create({
        ...query,
        numero_factura,
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
      const { fechaIn, fechaFin, ruc } = req.query;

      const where = { activo: true };
      if (fechaIn && fechaFin)
        where.date_fecha = { [Op.between]: [fechaIn, fechaFin] };
      if (ruc) where.str_ruc_cliente = ruc;

      const result = await facturas.findAll({ where });
      res.json(result);
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  getUltimoID = async () => {
    try {
      const last = await facturas.findOne({ order: [["id", "DESC"]] });
      if (last) {
        return last.getDataValue("id");
      } else {
        return 0;
      }
    } catch (error) {
      throw new Error(error.message);
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
    }
  };
  // obtiene por id
  getById = async (id) => {
    try {
      console.log("obteniendo factura por id");
      const result = await facturas.findOne({
        where: { id },
        include: { model: facturas_detalles, include: productos },
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getReporte = async (req, res) => {
    try {

      let {fechaInit, fechaFin} = req.query;

      if (!fechaInit || !fechaFin) {
        const today = new Date();
        fechaInit = today.toISOString().split('T')[0];
        fechaFin = today.toISOString().split('T')[0];
      }

      const result = await facturas.sequelize.query(`  
        SELECT productos.id, productos.str_nombre,
        SUM(facturas_detalles.cantidad) as 'cantidad',
        SUM(facturas_detalles.cantidad * facturas_detalles.precio) as 'monto_total'
        FROM facturas_detalles
        INNER JOIN productos ON facturas_detalles.id_producto = productos.id
        INNER JOIN facturas ON facturas_detalles.id_factura = facturas.id
        WHERE facturas.date_fecha BETWEEN ? AND ?
        GROUP BY productos.id
        ORDER BY SUM(facturas_detalles.cantidad) DESC
        LIMIT 10`, {replacements: [fechaInit,fechaFin]});
      res.json(result[0])
    } catch (error) {
      res.status(500).json({error:error.message});
    }
  };
}
