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
      id_factura_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'facturas_proveedores',
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
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      precio_compra: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true
      },
      subtotal: {
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
          name: "id_factura_proveedor",
          using: "BTREE",
          fields: [
            { name: "id_factura_proveedor" },
          ]
        },
        {
          name: "id_producto",
          using: "BTREE",
          fields: [
            { name: "id_producto" },
          ]
        },
      ]
    });
  }
}
