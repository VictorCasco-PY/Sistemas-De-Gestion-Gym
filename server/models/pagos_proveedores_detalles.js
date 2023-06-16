import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pagos_proveedores_detalles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pago_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pagos_proveedores',
        key: 'id'
      }
    },
    id_forma_de_pago: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formas_de_pagos',
        key: 'id'
      }
    },
    monto: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'pagos_proveedores_detalles',
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
        name: "id_pago_proveedor",
        using: "BTREE",
        fields: [
          { name: "id_pago_proveedor" },
        ]
      },
      {
        name: "id_forma_de_pago",
        using: "BTREE",
        fields: [
          { name: "id_forma_de_pago" },
        ]
      },
    ]
  });
  }
}
