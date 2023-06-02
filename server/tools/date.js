export const getDateNow = () => {
  const date = new Date();
  return date;
};

export const toDate = (fecha) => {
  const _date = fecha.split("-");
  const date = new Date();
  date.setFullYear(_date[0]);
  date.setMonth(_date[1]-1);
  date.setDate(_date[2]);
  return date;
};

export const esFechaVencida = (fecha1) => {
  const fechaHoy = new Date();
  return Math.floor((fecha1 - fechaHoy) / (1000 * 60 * 60 * 24)) < 0;
};
