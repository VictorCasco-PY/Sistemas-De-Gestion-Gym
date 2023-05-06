import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _arqueos from  "./arqueos.js";
import _arqueos_detalles from  "./arqueos_detalles.js";
import _cajas from  "./cajas.js";
import _clientes from  "./clientes.js";
import _cobros from  "./cobros.js";
import _cobros_detalles from  "./cobros_detalles.js";
import _empleados from  "./empleados.js";
import _facturas from  "./facturas.js";
import _facturas_detalles from  "./facturas_detalles.js";
import _facturas_proveedores_detalles from  "./facturas_proveedores_detalles.js";
import _formas_de_pagos from  "./formas_de_pagos.js";
import _mediciones_clientes from  "./mediciones_clientes.js";
import _pagos_proveedor from  "./pagos_proveedor.js";
import _planes_de_pagos from  "./planes_de_pagos.js";
import _productos from  "./productos.js";
import _proveedores from  "./proveedores.js";
import _sesiones_cajas from  "./sesiones_cajas.js";
import _stocks from  "./stocks.js";
import _stocks_productos from  "./stocks_productos.js";
import _timbrados from  "./timbrados.js";
import _tipos_modalidades_de_pagos from  "./tipos_modalidades_de_pagos.js";
import _transacciones from  "./transacciones.js";
import _transacciones_detalles from  "./transacciones_detalles.js";

export default function initModels(sequelize) {
  const arqueos = _arqueos.init(sequelize, DataTypes);
  const arqueos_detalles = _arqueos_detalles.init(sequelize, DataTypes);
  const cajas = _cajas.init(sequelize, DataTypes);
  const clientes = _clientes.init(sequelize, DataTypes);
  const cobros = _cobros.init(sequelize, DataTypes);
  const cobros_detalles = _cobros_detalles.init(sequelize, DataTypes);
  const empleados = _empleados.init(sequelize, DataTypes);
  const facturas = _facturas.init(sequelize, DataTypes);
  const facturas_detalles = _facturas_detalles.init(sequelize, DataTypes);
  const facturas_proveedores_detalles = _facturas_proveedores_detalles.init(sequelize, DataTypes);
  const formas_de_pagos = _formas_de_pagos.init(sequelize, DataTypes);
  const mediciones_clientes = _mediciones_clientes.init(sequelize, DataTypes);
  const pagos_proveedor = _pagos_proveedor.init(sequelize, DataTypes);
  const planes_de_pagos = _planes_de_pagos.init(sequelize, DataTypes);
  const productos = _productos.init(sequelize, DataTypes);
  const proveedores = _proveedores.init(sequelize, DataTypes);
  const sesiones_cajas = _sesiones_cajas.init(sequelize, DataTypes);
  const stocks = _stocks.init(sequelize, DataTypes);
  const stocks_productos = _stocks_productos.init(sequelize, DataTypes);
  const timbrados = _timbrados.init(sequelize, DataTypes);
  const tipos_modalidades_de_pagos = _tipos_modalidades_de_pagos.init(sequelize, DataTypes);
  const transacciones = _transacciones.init(sequelize, DataTypes);
  const transacciones_detalles = _transacciones_detalles.init(sequelize, DataTypes);

  arqueos_detalles.belongsTo(arqueos, { as: "id_arqueo_arqueo", foreignKey: "id_arqueo"});
  arqueos.hasMany(arqueos_detalles, { as: "arqueos_detalles", foreignKey: "id_arqueo"});
  sesiones_cajas.belongsTo(cajas, { as: "id_caja_caja", foreignKey: "id_caja"});
  cajas.hasMany(sesiones_cajas, { as: "sesiones_cajas", foreignKey: "id_caja"});
  facturas.belongsTo(clientes, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  clientes.hasMany(facturas, { as: "facturas", foreignKey: "id_cliente"});
  mediciones_clientes.belongsTo(clientes, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  clientes.hasMany(mediciones_clientes, { as: "mediciones_clientes", foreignKey: "id_cliente"});
  planes_de_pagos.belongsTo(clientes, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  clientes.hasMany(planes_de_pagos, { as: "planes_de_pagos", foreignKey: "id_cliente"});
  cobros_detalles.belongsTo(cobros, { as: "id_cobro_cobro", foreignKey: "id_cobro"});
  cobros.hasMany(cobros_detalles, { as: "cobros_detalles", foreignKey: "id_cobro"});
  transacciones.belongsTo(cobros, { as: "id_cobro_cobro", foreignKey: "id_cobro"});
  cobros.hasMany(transacciones, { as: "transacciones", foreignKey: "id_cobro"});
  arqueos.belongsTo(empleados, { as: "id_empleado_empleado", foreignKey: "id_empleado"});
  empleados.hasMany(arqueos, { as: "arqueos", foreignKey: "id_empleado"});
  mediciones_clientes.belongsTo(empleados, { as: "id_empleado_empleado", foreignKey: "id_empleado"});
  empleados.hasMany(mediciones_clientes, { as: "mediciones_clientes", foreignKey: "id_empleado"});
  planes_de_pagos.belongsTo(empleados, { as: "id_empleado_empleado", foreignKey: "id_empleado"});
  empleados.hasMany(planes_de_pagos, { as: "planes_de_pagos", foreignKey: "id_empleado"});
  sesiones_cajas.belongsTo(empleados, { as: "id_empleado_empleado", foreignKey: "id_empleado"});
  empleados.hasMany(sesiones_cajas, { as: "sesiones_cajas", foreignKey: "id_empleado"});
  cobros.belongsTo(factura_proveedor, { as: "id_factura_factura_proveedor", foreignKey: "id_factura"});
  factura_proveedor.hasMany(cobros, { as: "cobros", foreignKey: "id_factura"});
  pagos_proveedor.belongsTo(factura_proveedor, { as: "id_factura_proveedor_factura_proveedor", foreignKey: "id_factura_proveedor"});
  factura_proveedor.hasMany(pagos_proveedor, { as: "pagos_proveedors", foreignKey: "id_factura_proveedor"});
  facturas_detalles.belongsTo(facturas, { as: "id_factura_factura", foreignKey: "id_factura"});
  facturas.hasMany(facturas_detalles, { as: "facturas_detalles", foreignKey: "id_factura"});
  facturas_proveedores_detalles.belongsTo(facturas_proveedores, { as: "id_factura_proveedor_facturas_proveedore", foreignKey: "id_factura_proveedor"});
  facturas_proveedores.hasMany(facturas_proveedores_detalles, { as: "facturas_proveedores_detalles", foreignKey: "id_factura_proveedor"});
  arqueos_detalles.belongsTo(formas_de_pago, { as: "id_forma_de_pago_formas_de_pago", foreignKey: "id_forma_de_pago"});
  formas_de_pago.hasMany(arqueos_detalles, { as: "arqueos_detalles", foreignKey: "id_forma_de_pago"});
  transacciones_detalles.belongsTo(formas_de_pago, { as: "id_forma_de_pago_formas_de_pago", foreignKey: "id_forma_de_pago"});
  formas_de_pago.hasMany(transacciones_detalles, { as: "transacciones_detalles", foreignKey: "id_forma_de_pago"});
  transacciones.belongsTo(pagos_proveedores, { as: "id_pago_proveedor_pagos_proveedore", foreignKey: "id_pago_proveedor"});
  pagos_proveedores.hasMany(transacciones, { as: "transacciones", foreignKey: "id_pago_proveedor"});
  facturas_detalles.belongsTo(planes_de_pagos, { as: "id_plan_de_pago_planes_de_pago", foreignKey: "id_plan_de_pago"});
  planes_de_pagos.hasMany(facturas_detalles, { as: "facturas_detalles", foreignKey: "id_plan_de_pago"});
  facturas_detalles.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto"});
  productos.hasMany(facturas_detalles, { as: "facturas_detalles", foreignKey: "id_producto"});
  facturas_proveedores_detalles.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto"});
  productos.hasMany(facturas_proveedores_detalles, { as: "facturas_proveedores_detalles", foreignKey: "id_producto"});
  stocks_productos.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto"});
  productos.hasMany(stocks_productos, { as: "stocks_productos", foreignKey: "id_producto"});
  arqueos.belongsTo(sesiones_cajas, { as: "id_sesion_caja_sesiones_caja", foreignKey: "id_sesion_caja"});
  sesiones_cajas.hasMany(arqueos, { as: "arqueos", foreignKey: "id_sesion_caja"});
  transacciones.belongsTo(sesiones_cajas, { as: "id_sesion_caja_sesiones_caja", foreignKey: "id_sesion_caja"});
  sesiones_cajas.hasMany(transacciones, { as: "transacciones", foreignKey: "id_sesion_caja"});
  facturas_proveedores_detalles.belongsTo(stocks, { as: "id_stock_stock", foreignKey: "id_stock"});
  stocks.hasMany(facturas_proveedores_detalles, { as: "facturas_proveedores_detalles", foreignKey: "id_stock"});
  stocks_productos.belongsTo(stocks, { as: "id_stock_stock", foreignKey: "id_stock"});
  stocks.hasMany(stocks_productos, { as: "stocks_productos", foreignKey: "id_stock"});
  facturas.belongsTo(timbrados, { as: "id_timbrado_timbrado", foreignKey: "id_timbrado"});
  timbrados.hasMany(facturas, { as: "facturas", foreignKey: "id_timbrado"});
  planes_de_pagos.belongsTo(tipos_modalidades_de_pagos, { as: "id_tipo_modalidad_de_pago_tipos_modalidades_de_pago", foreignKey: "id_tipo_modalidad_de_pago"});
  tipos_modalidades_de_pagos.hasMany(planes_de_pagos, { as: "planes_de_pagos", foreignKey: "id_tipo_modalidad_de_pago"});
  arqueos_detalles.belongsTo(transacciones, { as: "id_transaccion_transaccione", foreignKey: "id_transaccion"});
  transacciones.hasMany(arqueos_detalles, { as: "arqueos_detalles", foreignKey: "id_transaccion"});
  transacciones_detalles.belongsTo(transacciones, { as: "id_transaccion_transaccione", foreignKey: "id_transaccion"});
  transacciones.hasMany(transacciones_detalles, { as: "transacciones_detalles", foreignKey: "id_transaccion"});

  return {
    arqueos,
    arqueos_detalles,
    cajas,
    clientes,
    cobros,
    cobros_detalles,
    empleados,
    facturas,
    facturas_detalles,
    facturas_proveedores_detalles,
    formas_de_pagos,
    mediciones_clientes,
    pagos_proveedor,
    planes_de_pagos,
    productos,
    proveedores,
    sesiones_cajas,
    stocks,
    stocks_productos,
    timbrados,
    tipos_modalidades_de_pagos,
    transacciones,
    transacciones_detalles,
  };
}
