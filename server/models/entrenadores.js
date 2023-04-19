import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class entrenadores extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    especialidad_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'especialidades',
        key: 'id'
      }
    },
    empleado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'entrenadores',
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
        name: "empleado_id_idx",
        using: "BTREE",
        fields: [
          { name: "empleado_id" },
        ]
      },
      {
        name: "especialidad_id",
        using: "BTREE",
        fields: [
          { name: "especialidad_id" },
        ]
      },
    ]
  });
  }
}
