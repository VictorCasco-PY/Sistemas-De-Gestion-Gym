const DataTypes = require("sequelize").DataTypes;
const _clientes = require("./clientes");
const _entrenadores = require("./entrenadores");
const _mediciones_clientes = require("./mediciones_clientes");

function initModels(sequelize) {
  const clientes = _clientes(sequelize, DataTypes);
  const entrenadores = _entrenadores(sequelize, DataTypes);
  const mediciones_clientes = _mediciones_clientes(sequelize, DataTypes);

  mediciones_clientes.belongsTo(clientes, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  clientes.hasMany(mediciones_clientes, { as: "mediciones_clientes", foreignKey: "id_cliente"});
  mediciones_clientes.belongsTo(entrenadores, { as: "id_entrenador_entrenadore", foreignKey: "id_entrenador"});
  entrenadores.hasMany(mediciones_clientes, { as: "mediciones_clientes", foreignKey: "id_entrenador"});
  entrenadores.belongsTo(especialidades, { as: "id_especialidad_especialidade", foreignKey: "id_especialidad"});
  especialidades.hasMany(entrenadores, { as: "entrenadores", foreignKey: "id_especialidad"});

  return {
    clientes,
    entrenadores,
    mediciones_clientes,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
