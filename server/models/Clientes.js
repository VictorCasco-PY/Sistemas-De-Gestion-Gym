const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return clientes.init(sequelize, DataTypes);
}

class clientes extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    str_nombre: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    str_direccion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    str_ruc: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'clientes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
  }
}
