import { models } from "../models/models.js";

const {planes_de_pagos} = models;

export const actualizarEstados = async () => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const planesVencidos = await planes_de_pagos.findAll({
      where: {
        date_fecha_de_vencimiento: {
          [Op.lt]: today, //fecha de pago es menor a la fecha actual
        },
      },
    });

    planesVencidos.forEach(async (plan) => {
      await planes_de_pagos.update(
        { estado_de_pago: "atrasado" },
        { where: { id: plan.id } }
      );
    });
  } catch (error) {
    console.log(error.message);
  }
};
