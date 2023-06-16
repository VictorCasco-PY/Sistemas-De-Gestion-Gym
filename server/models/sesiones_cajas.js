import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class sesiones_cajas extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_caja: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cajas',
        key: 'id'
      }
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'id'
      }
    },
    monto_inicial: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    monto_final: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    date_fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    time_inicio: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time_cierre: {
      type: DataTypes.TIME,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'sesiones_cajas',
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
        name: "id_caja",
        using: "BTREE",
        fields: [
          { name: "id_caja" },
        ]
      },
      {
        name: "id_empleado",
        using: "BTREE",
        fields: [
          { name: "id_empleado" },
        ]
      },
    ]
  });
  }
}
