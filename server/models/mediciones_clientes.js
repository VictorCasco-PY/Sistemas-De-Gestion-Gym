import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mediciones_clientes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    entrenador_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'entrenadores',
        key: 'id'
      }
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    date_fecha_medicion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    peso: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    altura: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    cintura: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    piernas: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    porcentaje_grasa_corporal: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mediciones_clientes',
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
        name: "cliente_id",
        using: "BTREE",
        fields: [
          { name: "cliente_id" },
        ]
      },
      {
        name: "entrenador_id",
        using: "BTREE",
        fields: [
          { name: "entrenador_id" },
        ]
      },
    ]
  });
  }
}
