import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tipos_modalidades_de_pagos extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      str_nombre: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      precio: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      sequelize,
      tableName: 'tipos_modalidades_de_pagos',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  }
}
