import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class arqueos_detalles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_arqueo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'arqueos',
        key: 'id'
      }
    },
    id_forma_de_pago: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'formas_de_pago',
        key: 'id'
      }
    },
    id_transaccion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'transacciones',
        key: 'id'
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    str_forma_de_pago: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'arqueos_detalles',
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
        name: "id_arqueo",
        using: "BTREE",
        fields: [
          { name: "id_arqueo" },
        ]
      },
      {
        name: "id_forma_de_pago",
        using: "BTREE",
        fields: [
          { name: "id_forma_de_pago" },
        ]
      },
      {
        name: "id_transaccion",
        using: "BTREE",
        fields: [
          { name: "id_transaccion" },
        ]
      },
    ]
  });
  }
}
