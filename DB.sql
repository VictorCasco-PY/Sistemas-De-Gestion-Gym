-- MySQL Script generated by MySQL Workbench
-- Fri May  5 19:31:46 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema GymDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema GymDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GymDB` DEFAULT CHARACTER SET utf8 ;
USE `GymDB` ;

-- -----------------------------------------------------
-- Table `GymDB`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `edad` INT NULL,
  `str_direccion` VARCHAR(200) NULL,
  `str_ruc` VARCHAR(200) NULL,
  `str_cedula` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `str_ruc_UNIQUE` (`str_ruc` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`tipos_modalidades_de_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`tipos_modalidades_de_pagos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `precio` DECIMAL NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`planes_de_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`planes_de_pagos` (
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
  FOREIGN KEY (`id_cliente`) REFERENCES `GymDB`.`clientes`(`id`),
  FOREIGN KEY (`id_empleado`) REFERENCES `GymDB`.`empleados`(`id`),
  FOREIGN KEY (`id_tipo_modalidad_de_pago`) REFERENCES `GymDB`.`tipos_modalidades_de_pagos`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`empleados` (
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
-- Table `GymDB`.`mediciones_clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`mediciones_clientes` (
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
  INDEX `id_empleado_idx` (`id_empleado` ASC) VISIBLE,
  FOREIGN KEY (`id_cliente`) REFERENCES `GymDB`.`clientes`(`id`),
  FOREIGN KEY (`id_empleado`) REFERENCES `GymDB`.`empleados`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_descripcion` VARCHAR(200) NULL,
  `precio` DECIMAL NULL,
  `iva` DECIMAL NULL,
  `str_nombre` VARCHAR(200) NULL,
  `str_codigo` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`stocks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`stocks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `str_direccion` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`stocks_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`stocks_productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL,
  `id_stock` INT NULL,
  `cantidad` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_producto`) REFERENCES `GymDB`.`productos`(`id`),
  FOREIGN KEY (`id_stock`) REFERENCES `GymDB`.`stocks`(`id`))
  
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`timbrados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`timbrados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_timbrado` VARCHAR(200) NULL,
  `date_inicio_timbrado` DATE NULL,
  `date_fin_timbrado` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`facturas` (
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
  FOREIGN KEY (`id_cliente`) REFERENCES `GymDB`.`clientes`(`id`),
  FOREIGN KEY (`id_timbrado`) REFERENCES `GymDB`.`timbrados`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`facturas_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`facturas_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_factura` INT NULL,
  `id_producto` INT NULL,
  `id_plan_de_pago` INT NULL,
  `subtotal` DECIMAL NULL,
  `cantidad` INT NULL,
  `precio` DECIMAL NULL,
  `iva` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_factura`) REFERENCES `GymDB`.`facturas`(`id`),
  FOREIGN KEY (`id_producto`) REFERENCES `GymDB`.`productos`(`id`),
  FOREIGN KEY (`id_plan_de_pago`) REFERENCES `GymDB`.`planes_de_pagos`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `str_direccion` VARCHAR(200) NULL,
  `str_telefono` VARCHAR(200) NULL,
  `str_ruc` VARCHAR(200) NULL,
  `str_correo` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`facturas_proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`facturas_proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_proveedor` INT NULL,
  `date_fecha` DATE NULL,
  `total` DECIMAL NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`facturas_proveedores_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`facturas_proveedores_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_factura_proveedor` INT NULL,
  `id_producto` INT NULL,
  `id_stock` INT NULL,
  `cantidad` INT NULL,
  `precio_compra` DECIMAL NULL,
  `subtotal` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_factura_proveedor`) REFERENCES `GymDB`.`facturas_proveedores`(`id`),
  FOREIGN KEY (`id_producto`) REFERENCES `GymDB`.`productos`(`id`),
  FOREIGN KEY (`id_stock`) REFERENCES `GymDB`.`stocks`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`cajas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`cajas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`sesiones_cajas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`sesiones_cajas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_caja` INT NULL,
  `id_empleado` INT NULL,
  `monto_inicial` DECIMAL NULL,
  `monto_final` DECIMAL NULL,
  `date_fecha` DATE NULL,
  `time_inicio` TIME NULL,
  `time_cierre` TIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_caja`) REFERENCES `GymDB`.`cajas`(`id`),
  FOREIGN KEY (`id_empleado`) REFERENCES `GymDB`.`empleados`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`formas_de_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`formas_de_pagos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_forma` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`pagos_proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`pagos_proveedor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_factura_proveedor` INT NULL,
  `date_fecha` DATE NULL,
  `total` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_factura_proveedor`) REFERENCES `GymDB`.`facturas_proveedores`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`arqueos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`arqueos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_sesion_caja` INT NULL,
  `id_empleado` INT NULL,
  `date_fecha` DATE NULL,
  `total` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_sesion_caja`) REFERENCES `GymDB`.`sesiones_cajas`(`id`),
  FOREIGN KEY (`id_empleado`) REFERENCES `GymDB`.`empleados`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`cobros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`cobros` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_factura` INT NULL,
  `date_fecha` DATE NULL,
  `time_hora` TIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_factura`) REFERENCES `GymDB`.`facturas_proveedores`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`transacciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`transacciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_sesion_caja` INT NULL,
  `id_pago_proveedor` INT NULL,
  `id_cobro` INT NULL,
  `total` DECIMAL NULL,
  `time_hora` TIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_sesion_caja`) REFERENCES `GymDB`.`sesiones_cajas`(`id`),
  FOREIGN KEY (`id_pago_proveedor`) REFERENCES `GymDB`.`pagos_proveedores`(`id`),
  FOREIGN KEY (`id_cobro`) REFERENCES `GymDB`.`cobros`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`arqueos_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`arqueos_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_arqueo` INT NULL,
  `id_forma_de_pago` INT NULL,
  `id_transaccion` INT NULL,
  `subtotal` DECIMAL NULL,
  `str_forma_de_pago` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_arqueo`) REFERENCES `GymDB`.`arqueos`(`id`),
  FOREIGN KEY (`id_forma_de_pago`) REFERENCES `GymDB`.`formas_de_pago`(`id`),
  FOREIGN KEY (`id_transaccion`) REFERENCES `GymDB`.`transacciones`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`cobros_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`cobros_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cobro` INT NULL,
  `monto` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_cobro`) REFERENCES `GymDB`.`cobros`(`id`))

ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`transacciones_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`transacciones_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_transaccion` INT NULL,
  `id_forma_de_pago` INT NULL,
  `str_forma_de_pago` VARCHAR(200) NULL,
  `subtotal` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_transaccion`) REFERENCES `GymDB`.`transacciones`(`id`),
  FOREIGN KEY (`id_forma_de_pago`) REFERENCES `GymDB`.`formas_de_pago`(`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
