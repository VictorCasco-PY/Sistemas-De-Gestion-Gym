const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return mediciones_clientes.init(sequelize, DataTypes);
}

class mediciones_clientes extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_mediciones_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_entrenador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'entrenadores',
        key: 'id_entrenador'
      }
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clientes',
        key: 'id_cliente'
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
          { name: "id_mediciones_cliente" },
        ]
      },
      {
        name: "id_cliente",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
      {
        name: "id_entrenador",
        using: "BTREE",
        fields: [
          { name: "id_entrenador" },
        ]
      },
    ]
  });
  }
}
