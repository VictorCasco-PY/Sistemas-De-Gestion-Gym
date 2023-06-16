import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pagos_proveedores extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_factura_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facturas_proveedores',
        key: 'id'
      }
    },
    date_fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(10,0),
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
    }
  }, {
    sequelize,
    tableName: 'pagos_proveedores',
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
        name: "id_factura_proveedor",
        using: "BTREE",
        fields: [
          { name: "id_factura_proveedor" },
        ]
      },
      {
        name: "pagos_proveedores_id_sesion_caja_foreign_idx",
        using: "BTREE",
        fields: [
          { name: "id_sesion_caja" },
        ]
      },
    ]
  });
  }
}
