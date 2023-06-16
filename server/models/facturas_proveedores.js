import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facturas_proveedores extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    str_ruc: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_nombre: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nro_factura: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'facturas_proveedores',
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
