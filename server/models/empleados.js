import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class empleados extends Model {
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
    str_telefono: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_direccion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_cedula: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    time_inicio_trabajo: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time_fin_trabajo: {
      type: DataTypes.TIME,
      allowNull: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'empleados',
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
        name: "usuario_id_idx",
        using: "BTREE",
        fields: [
          { name: "usuario_id" },
        ]
      },
    ]
  });
  }
}
