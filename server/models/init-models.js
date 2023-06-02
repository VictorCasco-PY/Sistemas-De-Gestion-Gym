import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _productos from  "./productos.js";

export default function initModels(sequelize) {
  const productos = _productos.init(sequelize, DataTypes);


  return {
    productos,
  };
}
