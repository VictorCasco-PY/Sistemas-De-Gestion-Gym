import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class arqueos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_sesion_caja: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sesiones_cajas',
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
    date_fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'arqueos',
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
        name: "id_empleado",
        using: "BTREE",
        fields: [
          { name: "id_empleado" },
        ]
      },
      {
        name: "id_sesion_caja",
        using: "BTREE",
        fields: [
          { name: "id_sesion_caja" },
        ]
      },
    ]
  });
  }
}
