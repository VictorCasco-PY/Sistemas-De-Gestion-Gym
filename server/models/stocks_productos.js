import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class stocks_productos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    id_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stocks',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stocks_productos',
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
        name: "producto_id",
        using: "BTREE",
        fields: [
          { name: "producto_id" },
        ]
      },
      {
        name: "id_stock",
        using: "BTREE",
        fields: [
          { name: "id_stock" },
        ]
      },
    ]
  });
  }
}
