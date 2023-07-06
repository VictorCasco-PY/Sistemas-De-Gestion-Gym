import { models } from "../models/models.js";
import { esPlanVencido, getDateNow, nuevaFechaVencimiento, toDate } from "../tools/date.js";
import { Cliente } from "./clientes.controller.js";
import { Op } from "sequelize";
import { TipoModalidadDePago } from "./tipos_modalidades_de_pagos.js";
const { planes_de_pagos, clientes } = models;

const tiposModalidadesDePagos = new TipoModalidadDePago();
const clientesController = new Cliente();

export class PlanesDePagos {
  /*
    Creamos un nuevo plan
    */
  crear = async (req, res) => {
    try {
      const { body } = req;
      const { id_tipo_modalidad_de_pago } = body;
      const { id_cliente } = body;
      const str_modalidad = await tiposModalidadesDePagos.getNombreModalidad(
        id_tipo_modalidad_de_pago
      );

      if (!(await clientesController.getById(id_cliente)))
        return res
          .status(404)
          .json({ error: "No existe un usuario con ese ID" });
      if (await this.getPlanPagoCliente(id_cliente)) {
        return res
          .status(409)
          .json({ error: "El cliente ya posee un plan de pago" });
      }

      const str_nombre_cliente = (await clientesController.getById(id_cliente))
        .str_nombre;

      const result = await planes_de_pagos.create({
        ...body,
        str_modalidad,
        str_nombre_cliente,
        estado_de_pago: "pendiente",
        date_fecha_de_vencimiento: toDate(body.date_fecha_de_vencimiento),
        date_fecha_de_pago: null,
        date_fecha_de_de_registro: getDateNow(),
        date_fecha_de_actualizacion: getDateNow(),
      });

      res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const [rowsAffected] = await planes_de_pagos.update(
        { ...body },
        { where: { id } }
      );
      if (rowsAffected === 0)
        return res.status(404).json("No se actualizo ningun plan de pago");
      res.status(200).send("Plan actualizado");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      if (!await this.getById(id))
        return res.status(404).json({ error: "No existe ese plan de pago" });
      await planes_de_pagos.update({activo:false}, {where: { id } });
      res.status(200).send("Plan de pago eliminado");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  // Devuelve todos los planes de pago registrados
  getAll = async (req, res) => {
    try {
      const { nombre, estado, ordenNombre, plan, ...querys } = req.query;

      const where = {
        activo:true,
        ...querys,
      };

      let options = {};
      if (ordenNombre == "asc") options.order = [["str_nombre_cliente", "ASC"]];
      if (ordenNombre == "desc")
        options.order = [["str_nombre_cliente", "DESC"]];
      if (nombre) where.str_nombre_cliente = { [Op.like]: `%${nombre}%` };
      if (estado) where.estado_de_pago = estado;
      if (plan) where.str_modalidad = plan;

      const result =
        (await planes_de_pagos.findAll({ where, ...options })) ||
        planes_de_pagos.findAll({ where });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtiene un plan de pago consultando por su ID
  getByParams = async (req, res) => {
    try {

      const { id } = req.params;
      const result = await planes_de_pagos.findOne({ where: { id }});
      if (!result)
        return res.status(404).json("No existe un plan de pago con ese ID");
      res.json(result);
    } catch (error) {
      res.json(error).status(500);
    }
  };

  // Devuelve un objeto si es que el usuario ya posee un plan de pago
  getPlanDePagoDeClienteByParams = async (req, res) => {
    try {
      const { id_cliente } = req.params;
      const result = await planes_de_pagos.findOne({ where: { id_cliente } });
      if (!result)
        return res.status(404).json({
          error: "No se encuentra un plan de pago con ese id de cliente",
        });
      res.json(result);
    } catch (error) {
      res.json(error).status(500);
    }
  };

  getPlanPagoCliente = async (id_cliente) => {
    try {
      const result = await planes_de_pagos.findOne({ where: { id_cliente } });
      return result;
    } catch (error) {
      return { error: "Algo salio mal" };
    }
  };

  getById = async (id) => {
    try {
      console.log(id);

      const result = await planes_de_pagos.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  cobrarPlan = async (id) => {
    try {
      const plan = await this.getById(id);

      // calcula una nueva fecha para pago
      const date_fecha_de_vencimiento = nuevaFechaVencimiento(plan.date_fecha_de_vencimiento, plan.id_tipo_modalidad_de_pago);
      
      // actualiza la fecha del ultimo pago
      const date_fecha_de_pago = getDateNow();

      // actualizamos el estado del plan de pago
      let estado_de_pago = plan.estado_de_pago;      
      if (!esPlanVencido(date_fecha_de_vencimiento)) estado_de_pago = "pagado";
      
      await planes_de_pagos.update({
        estado_de_pago,
        date_fecha_de_vencimiento,
        date_fecha_de_pago
      }, {where:{id}});
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getReporte = async(req,res) =>{
    try {
      const where = {
        activo: true,
        estado_de_pago: "atrasado"
      }
      const result = await planes_de_pagos.findAll({
        where,
        include: {
          model: clientes,
          attributes: ['str_nombre', 'str_ruc', 'str_direccion', 'str_telefono']
        }
      });
      res.json(result)
    } catch (error) {
      res.json({ error: error.message });
    }
  }

}