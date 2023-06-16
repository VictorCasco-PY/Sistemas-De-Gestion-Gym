import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class clientes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    str_nombre: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    str_direccion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_ruc: {
      type: DataTypes.STRING(200),
      allowNull: true,
      unique: "str_ruc_UNIQUE"
    },
    str_cedula: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_telefono: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'clientes',
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
        name: "str_ruc_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "str_ruc" },
        ]
      },
    ]
  });
  }
}
