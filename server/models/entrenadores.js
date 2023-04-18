const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return entrenadores.init(sequelize, DataTypes);
}

class entrenadores extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_entrenador: {
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
    time_horario_inicio: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time_horario_cierre: {
      type: DataTypes.TIME,
      allowNull: true
    },
    id_especialidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'especialidades',
        key: 'id_especialidad'
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
          { name: "id_entrenador" },
        ]
      },
      {
        name: "id_especialidad",
        using: "BTREE",
        fields: [
          { name: "id_especialidad" },
        ]
      },
    ]
  });
  }
}
