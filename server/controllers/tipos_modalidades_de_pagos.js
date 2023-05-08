import {models} from "../models/models.js";

const {tipos_modalidades_de_pagos} = models;

export class TipoModalidadDePago {
  getAll = async (req, res) => {
    try {
      const result = await tipos_modalidades_de_pagos.findAll();
      res.json(result);
    } catch (error) {
      res.json(error.message).status(500);
    }
  }

  getNombreModalidad = async (id) => {
    try {
      const result = await tipos_modalidades_de_pagos.findOne({where: {id}});
      return result.str_nombre;
    } catch (error) {
      return new Error("Error al obtener nombre de la modalidad");
    }
  }

}