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
    proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proveedores',
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
      {
        name: "proveedor_id",
        using: "BTREE",
        fields: [
          { name: "proveedor_id" },
        ]
      },
    ]
  });
  }
}
