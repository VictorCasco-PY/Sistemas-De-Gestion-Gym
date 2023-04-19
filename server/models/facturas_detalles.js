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
    factura_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facturas',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    iva: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
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
        name: "factura_id",
        using: "BTREE",
        fields: [
          { name: "factura_id" },
        ]
      },
      {
        name: "producto_id",
        using: "BTREE",
        fields: [
          { name: "producto_id" },
        ]
      },
    ]
  });
  }
}
