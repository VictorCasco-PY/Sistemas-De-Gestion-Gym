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
    id_producto: {
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
        name: "id_producto",
        using: "BTREE",
        fields: [
          { name: "id_producto" },
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
