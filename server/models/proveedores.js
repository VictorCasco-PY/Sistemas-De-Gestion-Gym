import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class proveedores extends Model {
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
    str_direccion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_telefono: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_ruc: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_correo: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'proveedores',
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
    ]
  });
  }
}
