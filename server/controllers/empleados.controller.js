import bcrypt from "bcrypt";
import { models } from "../models/models.js";

const { empleados } = models;

export class Empleado {
  crear = async (req, res) => {
    try {
      const { body } = req;
      const { str_cedula } = body;
      body.password = bcrypt.hashSync(body.password, 10);
      if (await this.getByCedula(str_cedula))
        return res
          .status(400)
          .json({ error: "Ya existe un cliente con ese CI" });

      const result = await empleados.create({ ...body });

      res.json(result);
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const [rowsAffected] = await empleados.update(
        { ...body },
        { where: { id } }
      );
      if (rowsAffected === 0)
        return res.status(404).json("No se actualizo ningun empleado");
      res.status(200).send("Empleado actualizado");
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      if (!(await this.getById(id)))
        return res
          .status(404)
          .json({ error: "No existe un empleado con este id" });
      await empleados.update({activo:false, where: { id } });
      res.status(200).send("Empleado eliminado");
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  };
  getAll = async (req, res) => {
    try {
      const { nombre, user, ordenNombre,cedula, ...querys } = req.query;

      const where = {
        activo:true,
        ...querys
      };
      
      let options = {}; 
      if(ordenNombre=='asc') options.order = [['str_nombre', 'ASC']];
      if(ordenNombre=='desc') options.order = [['str_nombre', 'DESC']];
      if (nombre) where.str_nombre = { [Op.like]: `%${nombre}%` };
      if (user) where.user = user;
      if(cedula) where.str_cedula;

      const result = await empleados.findAll({ where, ...options }) || empleados.findAll({ where });

      res.json(result);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  };

  getByParams = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await empleados.findOne({ where: { id } });
      const { password, ...resultLimpio } = result.get({ plain: true });
      return res.status(200).json(resultLimpio);
    } catch (error) {
      const { message } = error;
      return res.status(500).json({ error: message });
    }
  }; // obtiene por id

  getById = async (id) => {
    try {
      const empleado = await empleados.findOne({ where: { id } });
      return empleado;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getByCedula = async (str_cedula) => {
    try {
      const empleado = await empleados.findOne({ where: { str_cedula } });
      return empleado;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getByUserName = async (user) => {
    try {
      const empleado = await empleados.findOne({ where: { user } });
      return empleado;
    } catch (error) {
        throw new Error(error.message);
    }
  };
}
