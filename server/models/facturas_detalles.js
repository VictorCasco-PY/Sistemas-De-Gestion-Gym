import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facturas_detalles extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_factura: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'facturas',
          key: 'id'
        }
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'productos',
          key: 'id'
        }
      },
      id_plan_de_pago: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'planes_de_pagos',
          key: 'id'
        }
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      precio: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true
      },
      iva: {
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
      tableName: 'facturas_detalles',
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
          name: "id_factura",
          using: "BTREE",
          fields: [
            { name: "id_factura" },
          ]
        },
        {
          name: "id_producto",
          using: "BTREE",
          fields: [
            { name: "id_producto" },
          ]
        },
        {
          name: "id_plan_de_pago",
          using: "BTREE",
          fields: [
            { name: "id_plan_de_pago" },
          ]
        },
      ]
    });
  }
}
