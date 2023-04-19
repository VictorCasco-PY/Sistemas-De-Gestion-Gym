import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facturas_proveedores_detalles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    factura_proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facturas_proveedores',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    precio_compra: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    subtotal: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'facturas_proveedores_detalles',
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
        name: "factura_proveedor_id",
        using: "BTREE",
        fields: [
          { name: "factura_proveedor_id" },
        ]
      },
    ]
  });
  }
}
