import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cobros extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    time_hora: {
      type: DataTypes.TIME,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    id_sesion_caja: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sesiones_cajas',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true,
      defaultValue: 0
    },
    id_factura: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facturas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'cobros',
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
        name: "cobros_id_sesion_caja_foreign_idx",
        using: "BTREE",
        fields: [
          { name: "id_sesion_caja" },
        ]
      },
      {
        name: "cobros_id_factura_foreign_idx",
        using: "BTREE",
        fields: [
          { name: "id_factura" },
        ]
      },
    ]
  });
  }
}
