import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _arqueos from "./arqueos.js";
import _arqueos_detalles from "./arqueos_detalles.js";
import _cajas from "./cajas.js";
import _clientes from "./clientes.js";
import _cobros from "./cobros.js";
import _cobros_detalles from "./cobros_detalles.js";
import _empleados from "./empleados.js";
import _facturas from "./facturas.js";
import _facturas_detalles from "./facturas_detalles.js";
import _facturas_proveedores from "./facturas_proveedores.js";
import _facturas_proveedores_detalles from "./facturas_proveedores_detalles.js";
import _formas_de_pagos from "./formas_de_pagos.js";
import _mediciones_clientes from "./mediciones_clientes.js";
import _pagos_proveedores from "./pagos_proveedores.js";
import _pagos_proveedores_detalles from "./pagos_proveedores_detalles.js"
import _planes_de_pagos from "./planes_de_pagos.js";
import _productos from "./productos.js";
import _proveedores from "./proveedores.js";
import _sesiones_cajas from "./sesiones_cajas.js";
import _timbrados from "./timbrados.js";
import _tipos_modalidades_de_pagos from "./tipos_modalidades_de_pagos.js";
import _transacciones from "./transacciones.js";
import _transacciones_detalles from "./transacciones_detalles.js";

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
  const facturas_proveedores = _facturas_proveedores.init(sequelize, DataTypes);
  const facturas_proveedores_detalles = _facturas_proveedores_detalles.init(
    sequelize,
    DataTypes
  );
  const formas_de_pagos = _formas_de_pagos.init(sequelize, DataTypes);
  const mediciones_clientes = _mediciones_clientes.init(sequelize, DataTypes);
  const pagos_proveedores = _pagos_proveedores.init(sequelize, DataTypes);
  const pagos_proveedores_detalles = _planes_de_pagos.init(sequelize, DataTypes);
  const planes_de_pagos = _planes_de_pagos.init(sequelize, DataTypes);
  const productos = _productos.init(sequelize, DataTypes);
  const proveedores = _proveedores.init(sequelize, DataTypes);
  const sesiones_cajas = _sesiones_cajas.init(sequelize, DataTypes);
  const timbrados = _timbrados.init(sequelize, DataTypes);
  const tipos_modalidades_de_pagos = _tipos_modalidades_de_pagos.init(
    sequelize,
    DataTypes
  );
  const transacciones = _transacciones.init(sequelize, DataTypes);
  const transacciones_detalles = _transacciones_detalles.init(
    sequelize,
    DataTypes
  );

  arqueos_detalles.belongsTo(arqueos, { foreignKey: "id_arqueo" });
  arqueos.hasMany(arqueos_detalles, { foreignKey: "id_arqueo" });
  sesiones_cajas.belongsTo(cajas, { foreignKey: "id_caja" });
  cajas.hasMany(sesiones_cajas, { foreignKey: "id_caja" });
  facturas.belongsTo(clientes, { foreignKey: "id_cliente" });
  clientes.hasMany(facturas, { foreignKey: "id_cliente" });
  mediciones_clientes.belongsTo(clientes, { foreignKey: "id_cliente" });
  clientes.hasMany(mediciones_clientes, { foreignKey: "id_cliente" });
  planes_de_pagos.belongsTo(clientes, { foreignKey: "id_cliente" });
  clientes.hasMany(planes_de_pagos, { foreignKey: "id_cliente" });
  cobros_detalles.belongsTo(cobros, { foreignKey: "id_cobro" });
  cobros.hasMany(cobros_detalles, { foreignKey: "id_cobro" });
  transacciones.belongsTo(cobros, { foreignKey: "id_cobro" });
  cobros.hasMany(transacciones, { foreignKey: "id_cobro" });
  arqueos.belongsTo(empleados, { foreignKey: "id_empleado" });
  empleados.hasMany(arqueos, { foreignKey: "id_empleado" });
  mediciones_clientes.belongsTo(empleados, { foreignKey: "id_empleado" });
  empleados.hasMany(mediciones_clientes, { foreignKey: "id_empleado" });
  planes_de_pagos.belongsTo(empleados, { foreignKey: "id_empleado" });
  empleados.hasMany(planes_de_pagos, { foreignKey: "id_empleado" });
  sesiones_cajas.belongsTo(empleados, { foreignKey: "id_empleado" });
  empleados.hasMany(sesiones_cajas, { foreignKey: "id_empleado" });
  facturas_detalles.belongsTo(facturas, { foreignKey: "id_factura" });
  facturas.hasMany(facturas_detalles, { foreignKey: "id_factura" });
  cobros.belongsTo(facturas, { foreignKey: "id_factura" });
  facturas.hasMany(cobros, { foreignKey: "id_factura" });
  facturas_proveedores_detalles.belongsTo(facturas_proveedores, {
    foreignKey: "id_factura_proveedor",
  });
  facturas_proveedores.hasMany(facturas_proveedores_detalles, {
    foreignKey: "id_factura_proveedor",
  });
  pagos_proveedores.belongsTo(facturas_proveedores, {
    foreignKey: "id_factura_proveedor",
  });

  pagos_proveedores_detalles.belongsTo(pagos_proveedores, {foreignKey:"id_pago_proveedor"})
  pagos_proveedores.hasMany(pagos_proveedores_detalles, {foreignKey:"id_pago_proveedor"});l
  facturas_proveedores.hasMany(pagos_proveedores, {
    as: "pagos_proveedores",
    foreignKey: "id_factura_proveedor",
  });
  arqueos_detalles.belongsTo(formas_de_pagos, {
    foreignKey: "id_forma_de_pago",
  });
  formas_de_pagos.hasMany(arqueos_detalles, { foreignKey: "id_forma_de_pago" });
  transacciones_detalles.belongsTo(formas_de_pagos, {
    foreignKey: "id_forma_de_pago",
  });
  formas_de_pagos.hasMany(transacciones_detalles, {
    foreignKey: "id_forma_de_pago",
  });
  transacciones.belongsTo(pagos_proveedores, {
    foreignKey: "id_pago_proveedor",
  });
  pagos_proveedores.hasMany(transacciones, { foreignKey: "id_pago_proveedor" });
  facturas_detalles.belongsTo(planes_de_pagos, {
    foreignKey: "id_plan_de_pago",
  });
  planes_de_pagos.hasMany(facturas_detalles, { foreignKey: "id_plan_de_pago" });
  facturas_detalles.belongsTo(productos, { foreignKey: "id_producto" });
  productos.hasMany(facturas_detalles, { foreignKey: "id_producto" });
  facturas_proveedores_detalles.belongsTo(productos, {
    foreignKey: "id_producto",
  });
  productos.hasMany(facturas_proveedores_detalles, {
    foreignKey: "id_producto",
  });
  arqueos.belongsTo(sesiones_cajas, { foreignKey: "id_sesion_caja" });
  sesiones_cajas.hasMany(arqueos, { foreignKey: "id_sesion_caja" });
  transacciones.belongsTo(sesiones_cajas, { foreignKey: "id_sesion_caja" });
  sesiones_cajas.hasMany(transacciones, { foreignKey: "id_sesion_caja" });
  facturas.belongsTo(timbrados, { foreignKey: "id_timbrado" });
  timbrados.hasMany(facturas, { foreignKey: "id_timbrado" });
  planes_de_pagos.belongsTo(tipos_modalidades_de_pagos, {
    foreignKey: "id_tipo_modalidad_de_pago",
  });
  tipos_modalidades_de_pagos.hasMany(planes_de_pagos, {
    foreignKey: "id_tipo_modalidad_de_pago",
  });
  arqueos_detalles.belongsTo(transacciones, { foreignKey: "id_transaccion" });
  transacciones.hasMany(arqueos_detalles, { foreignKey: "id_transaccion" });
  transacciones_detalles.belongsTo(transacciones, {
    foreignKey: "id_transaccion",
  });
  transacciones.hasMany(transacciones_detalles, {
    foreignKey: "id_transaccion",
  });

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
    facturas_proveedores,
    facturas_proveedores_detalles,
    formas_de_pagos,
    mediciones_clientes,
    pagos_proveedores,
    planes_de_pagos,
    productos,
    proveedores,
    sesiones_cajas,
    timbrados,
    tipos_modalidades_de_pagos,
    transacciones,
    transacciones_detalles,
    pagos_proveedores_detalles
  };
}
