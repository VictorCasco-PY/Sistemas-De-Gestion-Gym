import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class timbrados extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      str_timbrado: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      date_inicio_timbrado: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      date_fin_timbrado: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      sequelize,
      tableName: 'timbrados',
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
