
-- -----------------------------------------------------
-- Schema sql10622813
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sql10622813` DEFAULT CHARACTER SET utf8 ;
USE `sql10622813` ;

-- -----------------------------------------------------
-- Table `sql10622813`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `edad` INT NULL,
  `str_direccion` VARCHAR(200) NULL,
  `str_ruc` VARCHAR(200) NULL,
  `str_cedula` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `str_ruc_UNIQUE` (`str_ruc` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`tipos_modalidades_de_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`tipos_modalidades_de_pagos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `precio` DECIMAL NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`empleados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `str_nombre` VARCHAR(200) NULL,
  `str_telefono` VARCHAR(200) NULL,
  `str_direccion` VARCHAR(200) NULL,
  `str_cedula` VARCHAR(200) NULL,
  `time_inicio_trabajo` TIME NULL,
  `time_fin_trabajo` TIME NULL,
  `rol` ENUM("caja", "entrenador", "admin") NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`planes_de_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`planes_de_pagos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NULL,
  `id_empleado` INT NULL,
  `id_tipo_modalidad_de_pago` INT NULL,
  `str_nombre_cliente` VARCHAR(200) NULL,
  `str_modalidad` VARCHAR(200) NULL,
  `estado_de_pago` ENUM('pendiente', 'pagado', 'atrasado') NULL,
  `date_fecha_de_vencimiento` DATE NULL,
  `date_fecha_de_pago` DATE NULL,
  `date_fecha_de_registro` DATE NULL,
  `date_fecha_de_actualizacion` DATE NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_cliente`) REFERENCES `sql10622813`.`clientes`(`id`),
  FOREIGN KEY (`id_empleado`) REFERENCES `sql10622813`.`empleados`(`id`),
  FOREIGN KEY (`id_tipo_modalidad_de_pago`) REFERENCES `sql10622813`.`tipos_modalidades_de_pagos`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`mediciones_clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`mediciones_clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NULL,
  `id_empleado` INT NULL,
  `date_fecha_medicion` DATE NULL,
  `peso` DECIMAL NULL,
  `altura` DECIMAL NULL,
  `cintura` DECIMAL NULL,
  `piernas` DECIMAL NULL,
  `porcentaje_grasa_corporal` DECIMAL NULL,
  `brazos` DECIMAL NULL,
  PRIMARY KEY (`id`),
  INDEX `id_empleado_idx` (`id_empleado` ASC) ,
  FOREIGN KEY (`id_cliente`) REFERENCES `sql10622813`.`clientes`(`id`),
  FOREIGN KEY (`id_empleado`) REFERENCES `sql10622813`.`empleados`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_descripcion` VARCHAR(200) NULL,
  `precio` DECIMAL NULL,
  `iva` DECIMAL NULL,
  `str_nombre` VARCHAR(200) NULL,
  `str_codigo` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`stocks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`stocks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `str_direccion` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`stocks_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`stocks_productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL,
  `id_stock` INT NULL,
  `cantidad` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_producto`) REFERENCES `sql10622813`.`productos`(`id`),
  FOREIGN KEY (`id_stock`) REFERENCES `sql10622813`.`stocks`(`id`))
  
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`timbrados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`timbrados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_timbrado` VARCHAR(200) NULL,
  `date_inicio_timbrado` DATE NULL,
  `date_fin_timbrado` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`facturas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NULL,
  `id_timbrado` INT NULL,
  `numero_factura` INT NULL,
  `date_fecha` DATE NULL,
  `str_nombre_cliente` VARCHAR(200) NULL,
  `str_ruc_cliente` VARCHAR(200) NULL,
  `condicion` BINARY NULL,
  `total` DECIMAL NULL,
  `saldo` DECIMAL NULL,
  `iva_5` DECIMAL NULL,
  `iva_10` DECIMAL NULL,
  `iva_exenta` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_cliente`) REFERENCES `sql10622813`.`clientes`(`id`),
  FOREIGN KEY (`id_timbrado`) REFERENCES `sql10622813`.`timbrados`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`facturas_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`facturas_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_factura` INT NULL,
  `id_producto` INT NULL,
  `id_plan_de_pago` INT NULL,
  `subtotal` DECIMAL NULL,
  `cantidad` INT NULL,
  `precio` DECIMAL NULL,
  `iva` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_factura`) REFERENCES `sql10622813`.`facturas`(`id`),
  FOREIGN KEY (`id_producto`) REFERENCES `sql10622813`.`productos`(`id`),
  FOREIGN KEY (`id_plan_de_pago`) REFERENCES `sql10622813`.`planes_de_pagos`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `str_direccion` VARCHAR(200) NULL,
  `str_telefono` VARCHAR(200) NULL,
  `str_ruc` VARCHAR(200) NULL,
  `str_correo` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`facturas_proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`facturas_proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_proveedor` INT NULL,
  `date_fecha` DATE NULL,
  `total` DECIMAL NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`facturas_proveedores_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`facturas_proveedores_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_factura_proveedor` INT NULL,
  `id_producto` INT NULL,
  `id_stock` INT NULL,
  `cantidad` INT NULL,
  `precio_compra` DECIMAL NULL,
  `subtotal` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_factura_proveedor`) REFERENCES `sql10622813`.`facturas_proveedores`(`id`),
  FOREIGN KEY (`id_producto`) REFERENCES `sql10622813`.`productos`(`id`),
  FOREIGN KEY (`id_stock`) REFERENCES `sql10622813`.`stocks`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`cajas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`cajas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`sesiones_cajas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`sesiones_cajas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_caja` INT NULL,
  `id_empleado` INT NULL,
  `monto_inicial` DECIMAL NULL,
  `monto_final` DECIMAL NULL,
  `date_fecha` DATE NULL,
  `time_inicio` TIME NULL,
  `time_cierre` TIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_caja`) REFERENCES `sql10622813`.`cajas`(`id`),
  FOREIGN KEY (`id_empleado`) REFERENCES `sql10622813`.`empleados`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`formas_de_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`formas_de_pagos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_forma` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`pagos_proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`pagos_proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_factura_proveedor` INT NULL,
  `date_fecha` DATE NULL,
  `total` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_factura_proveedor`) REFERENCES `sql10622813`.`facturas_proveedores`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`arqueos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`arqueos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_sesion_caja` INT NULL,
  `id_empleado` INT NULL,
  `date_fecha` DATE NULL,
  `total` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_sesion_caja`) REFERENCES `sql10622813`.`sesiones_cajas`(`id`),
  FOREIGN KEY (`id_empleado`) REFERENCES `sql10622813`.`empleados`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`cobros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`cobros` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_factura` INT NULL,
  `date_fecha` DATE NULL,
  `time_hora` TIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_factura`) REFERENCES `sql10622813`.`facturas_proveedores`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`transacciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`transacciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_sesion_caja` INT NULL,
  `id_pago_proveedor` INT NULL,
  `id_cobro` INT NULL,
  `total` DECIMAL NULL,
  `time_hora` TIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_sesion_caja`) REFERENCES `sql10622813`.`sesiones_cajas`(`id`),
  FOREIGN KEY (`id_pago_proveedor`) REFERENCES `sql10622813`.`pagos_proveedores`(`id`),
  FOREIGN KEY (`id_cobro`) REFERENCES `sql10622813`.`cobros`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`arqueos_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`arqueos_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_arqueo` INT NULL,
  `id_forma_de_pago` INT NULL,
  `id_transaccion` INT NULL,
  `subtotal` DECIMAL NULL,
  `str_forma_de_pago` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_arqueo`) REFERENCES `sql10622813`.`arqueos`(`id`),
  FOREIGN KEY (`id_forma_de_pago`) REFERENCES `sql10622813`.`formas_de_pagos`(`id`),
  FOREIGN KEY (`id_transaccion`) REFERENCES `sql10622813`.`transacciones`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`cobros_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`cobros_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cobro` INT NULL,
  `monto` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_cobro`) REFERENCES `sql10622813`.`cobros`(`id`))

ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10622813`.`transacciones_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10622813`.`transacciones_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_transaccion` INT NULL,
  `id_forma_de_pago` INT NULL,
  `str_forma_de_pago` VARCHAR(200) NULL,
  `subtotal` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_transaccion`) REFERENCES `sql10622813`.`transacciones`(`id`),
  FOREIGN KEY (`id_forma_de_pago`) REFERENCES `sql10622813`.`formas_de_pagos`(`id`))
ENGINE = InnoDB;
