import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class usuarios extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user: {
      type: DataTypes.STRING(200),
      allowNull: true,
      unique: "user_UNIQUE"
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuarios',
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
        name: "user_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
  }
}
