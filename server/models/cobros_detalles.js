import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cobros_detalles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cobro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cobros',
        key: 'id'
      }
    },
    monto: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cobros_detalles',
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
