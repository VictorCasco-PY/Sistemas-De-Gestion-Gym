import moment from "moment";

export const getDateNow = () => {
  const date = moment().add(1,'day').format("YYYY/MM/DD");

  return date;
};


export const toDate = (fecha) => {
  const _date = fecha.split("-");
  const date = new Date();
  date.setFullYear(_date[0]);
  date.setMonth(_date[1] - 1);
  date.setDate(_date[2]);
  return date;
};

export const esFechaVencida = (fecha1) => {
  const fechaHoy = new Date();
  return Math.floor((fecha1 - fechaHoy) / (1000 * 60 * 60 * 24)) < 0;
};

export const nuevaFechaVencimiento = (fecha, id_modalidad) => {
  const date = moment(fecha, "YYYY-MM-DD");
  let nuevaFecha;

  switch(id_modalidad) {
    case 2: // Plan semanal
      nuevaFecha = date.add(1, "week").subtract(1, "day");
      break;
    case 3: // Plan mensual
      nuevaFecha = date.add(1, "month");
      break;
  }

  const fechaResultado = nuevaFecha.format("YYYY-MM-DD");
  return fechaResultado;
};

export const esPlanVencido = (fecha) => {
  const fechaActual = moment();
  const fechaComparar = moment(fecha, "YYYY/MM/DD");
  const result = fechaComparar.isBefore(fechaActual);
  console.log(result);
  return result
};