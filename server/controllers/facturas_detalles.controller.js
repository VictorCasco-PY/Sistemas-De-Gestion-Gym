import { models } from "../models/models.js";
import { PlanesDePagos } from "./planes_de_pagos.controller.js";
import { Productos } from "./productos.controller.js";

const { facturas_detalles } = models;

const producto = new Productos();
const planDePago = new PlanesDePagos();

export class FacturaDetalle {
  crear = async (req, res) => {
    try {
      const { body } = req;
      const { plan_de_pago } = body;
      const { productos } = body;

      if (!plan_de_pago && !productos)
        return res.json({ error: "Debes enviar productos o un plan de pago" });

      let result = {};

      // si hay productos, se intentan pagar
      if (productos && productos.length > 0) {
        // se crea una factura_detalle para cada producto
        result.productos = productos.map(async (p) => {
          if (await producto.getById(p.id)) {
            return await facturas_detalles.create({ ...p, ...body });
          }
          return false;
        });
      }
      console.log({plan_de_pago});
      console.log({productos});
      // si hay un plan de pago, se intenta pagar
      const { id_plan_de_pago } = plan_de_pago;
      delete planDePago.id_plan_de_pago;
      const plan = await planDePago.getById(id_plan_de_pago);
      if (!plan) {
        result.plan = res.json({ error: "No existe ese plan de pago" });
      } else {
        await planDePago.pagarPlan(id_plan_de_pago);
        result.plan = await facturas_detalles.create({
          id_plan_de_pago,
          ...plan_de_pago,
          ...body,
        });
      }

      // const result = await facturas_detalles.create({ ...body });
      return res.json({ ...result });
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
      await facturas_detalles.update({ where: { id }});
      return res.send("Factura eliminada correctamente");
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  getAll = async (req, res) => {
    try {
      const result = await facturas_detalles.findAll();
      res.json(result);
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
