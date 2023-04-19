import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _clientes from  "./clientes.js";
import _empleados from  "./empleados.js";
import _entrenadores from  "./entrenadores.js";
import _especialidades from  "./especialidades.js";
import _facturas from  "./facturas.js";
import _facturas_detalles from  "./facturas_detalles.js";
import _facturas_proveedores from  "./facturas_proveedores.js";
import _facturas_proveedores_detalles from  "./facturas_proveedores_detalles.js";
import _mediciones_clientes from  "./mediciones_clientes.js";
import _planes_de_pagos from  "./planes_de_pagos.js";
import _productos from  "./productos.js";
import _proveedores from  "./proveedores.js";
import _stocks from  "./stocks.js";
import _stocks_productos from  "./stocks_productos.js";
import _tipos_modalidades_de_pagos from  "./tipos_modalidades_de_pagos.js";
import _usuarios from  "./usuarios.js";

export default function initModels(sequelize) {
  const clientes = _clientes.init(sequelize, DataTypes);
  const empleados = _empleados.init(sequelize, DataTypes);
  const entrenadores = _entrenadores.init(sequelize, DataTypes);
  const especialidades = _especialidades.init(sequelize, DataTypes);
  const facturas = _facturas.init(sequelize, DataTypes);
  const facturas_detalles = _facturas_detalles.init(sequelize, DataTypes);
  const facturas_proveedores = _facturas_proveedores.init(sequelize, DataTypes);
  const facturas_proveedores_detalles = _facturas_proveedores_detalles.init(sequelize, DataTypes);
  const mediciones_clientes = _mediciones_clientes.init(sequelize, DataTypes);
  const planes_de_pagos = _planes_de_pagos.init(sequelize, DataTypes);
  const productos = _productos.init(sequelize, DataTypes);
  const proveedores = _proveedores.init(sequelize, DataTypes);
  const stocks = _stocks.init(sequelize, DataTypes);
  const stocks_productos = _stocks_productos.init(sequelize, DataTypes);
  const tipos_modalidades_de_pagos = _tipos_modalidades_de_pagos.init(sequelize, DataTypes);
  const usuarios = _usuarios.init(sequelize, DataTypes);

  facturas.belongsTo(clientes, { as: "cliente", foreignKey: "cliente_id"});
  clientes.hasMany(facturas, { as: "facturas", foreignKey: "cliente_id"});
  mediciones_clientes.belongsTo(clientes, { as: "cliente", foreignKey: "cliente_id"});
  clientes.hasMany(mediciones_clientes, { as: "mediciones_clientes", foreignKey: "cliente_id"});
  planes_de_pagos.belongsTo(clientes, { as: "cliente", foreignKey: "cliente_id"});
  clientes.hasMany(planes_de_pagos, { as: "planes_de_pagos", foreignKey: "cliente_id"});
  entrenadores.belongsTo(empleados, { as: "empleado", foreignKey: "empleado_id"});
  empleados.hasMany(entrenadores, { as: "entrenadores", foreignKey: "empleado_id"});
  mediciones_clientes.belongsTo(entrenadores, { as: "entrenador", foreignKey: "entrenador_id"});
  entrenadores.hasMany(mediciones_clientes, { as: "mediciones_clientes", foreignKey: "entrenador_id"});
  planes_de_pagos.belongsTo(entrenadores, { as: "entrenador", foreignKey: "entrenador_id"});
  entrenadores.hasMany(planes_de_pagos, { as: "planes_de_pagos", foreignKey: "entrenador_id"});
  entrenadores.belongsTo(especialidades, { as: "especialidad", foreignKey: "especialidad_id"});
  especialidades.hasMany(entrenadores, { as: "entrenadores", foreignKey: "especialidad_id"});
  facturas_detalles.belongsTo(facturas, { as: "factura", foreignKey: "factura_id"});
  facturas.hasMany(facturas_detalles, { as: "facturas_detalles", foreignKey: "factura_id"});
  facturas_proveedores_detalles.belongsTo(facturas_proveedores, { as: "factura_proveedor", foreignKey: "factura_proveedor_id"});
  facturas_proveedores.hasMany(facturas_proveedores_detalles, { as: "facturas_proveedores_detalles", foreignKey: "factura_proveedor_id"});
  facturas_detalles.belongsTo(productos, { as: "producto", foreignKey: "producto_id"});
  productos.hasMany(facturas_detalles, { as: "facturas_detalles", foreignKey: "producto_id"});
  stocks_productos.belongsTo(productos, { as: "producto", foreignKey: "producto_id"});
  productos.hasMany(stocks_productos, { as: "stocks_productos", foreignKey: "producto_id"});
  facturas_proveedores.belongsTo(proveedores, { as: "proveedor", foreignKey: "proveedor_id"});
  proveedores.hasMany(facturas_proveedores, { as: "facturas_proveedores", foreignKey: "proveedor_id"});
  stocks_productos.belongsTo(stocks, { as: "id_stock_stock", foreignKey: "id_stock"});
  stocks.hasMany(stocks_productos, { as: "stocks_productos", foreignKey: "id_stock"});
  planes_de_pagos.belongsTo(tipos_modalidades_de_pagos, { as: "tipo_modalidad_de_pago", foreignKey: "tipo_modalidad_de_pago_id"});
  tipos_modalidades_de_pagos.hasMany(planes_de_pagos, { as: "planes_de_pagos", foreignKey: "tipo_modalidad_de_pago_id"});
  empleados.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(empleados, { as: "empleados", foreignKey: "usuario_id"});

  return {
    clientes,
    empleados,
    entrenadores,
    especialidades,
    facturas,
    facturas_detalles,
    facturas_proveedores,
    facturas_proveedores_detalles,
    mediciones_clientes,
    planes_de_pagos,
    productos,
    proveedores,
    stocks,
    stocks_productos,
    tipos_modalidades_de_pagos,
    usuarios,
  };
}
