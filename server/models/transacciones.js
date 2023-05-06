import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class transacciones extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_sesion_caja: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sesiones_cajas',
        key: 'id'
      }
    },
    id_pago_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pagos_proveedores',
        key: 'id'
      }
    },
    id_cobro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cobros',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    time_hora: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'transacciones',
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
        name: "id_sesion_caja",
        using: "BTREE",
        fields: [
          { name: "id_sesion_caja" },
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
        name: "id_cobro",
        using: "BTREE",
        fields: [
          { name: "id_cobro" },
        ]
      },
    ]
  });
  }
}
