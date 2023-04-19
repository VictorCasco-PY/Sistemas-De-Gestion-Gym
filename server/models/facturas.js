import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facturas extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    numero_factura: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date_fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    timbrado: {
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
    str_nombre_cliente: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_ruc_cliente: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    condicion: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    saldo: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    iva_5: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    iva_10: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    iva_exenta: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'facturas',
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
    ]
  });
  }
}
