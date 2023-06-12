import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cobros extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_factura: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'facturas',
          key: 'id'
        }
      },
      id_sesion_caja: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'sesiones_cajas',
          key: 'id'
        }
      },
      date_fecha: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      time_hora: {
        type: DataTypes.TIME,
        allowNull: true
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      sequelize,
      tableName: 'cobros',
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
          name: "id_factura",
          using: "BTREE",
          fields: [
            { name: "id_factura" },
          ]
        },
        /*{
          name: "id_sesion_caja",
          using: "BTREE",
          fields: [
            { name: "id_sesion_caja" },
          ]
        },*/
      ]
    });
  }
}
