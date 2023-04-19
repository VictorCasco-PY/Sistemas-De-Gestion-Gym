import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class planes_de_pagos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    entrenador_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'entrenador_id',
        key: 'id'
      }
    },
    tipo_modalidad_de_pago_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipos_modalidades_de_pagos',
        key: 'id'
      }
    },
    str_nombre_cliente: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_modalidad: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    estado_de_pago: {
      type: DataTypes.ENUM('pendiente','pagado','atrasado'),
      allowNull: true
    },
    date_fecha_de_vencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_fecha_de_pago: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_fecha_de_registro: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_fecha_de_actualizacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'planes_de_pagos',
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
        name: "cliente_id",
        using: "BTREE",
        fields: [
          { name: "cliente_id" },
        ]
      },
      {
        name: "entrenador_id",
        using: "BTREE",
        fields: [
          { name: "entrenador_id" },
        ]
      },
      {
        name: "tipo_modalidad_de_pago_id",
        using: "BTREE",
        fields: [
          { name: "tipo_modalidad_de_pago_id" },
        ]
      },
    ]
  });
  }
}
