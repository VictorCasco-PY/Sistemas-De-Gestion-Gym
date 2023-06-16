import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cobros_detalles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cobro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cobros',
        key: 'id'
      }
    },
    monto: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    id_forma_de_pago: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'formas_de_pagos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'cobros_detalles',
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
      {
        name: "id_cobro",
        using: "BTREE",
        fields: [
          { name: "id_cobro" },
        ]
      },
      {
        name: "cobros_detalles_id_forma_de_pago_foreign_idx",
        using: "BTREE",
        fields: [
          { name: "id_forma_de_pago" },
        ]
      },
    ]
  });
  }
}
