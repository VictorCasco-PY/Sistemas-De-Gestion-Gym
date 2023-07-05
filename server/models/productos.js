import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class productos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    str_descripcion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    costo_compra: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    iva: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    str_nombre: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_codigo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'productos',
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
