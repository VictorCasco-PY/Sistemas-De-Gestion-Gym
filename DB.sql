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
  PRIMARY KEY (`id`),
  UNIQUE INDEX `str_ruc_UNIQUE` (`str_ruc` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`tipos_modalidades_de_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`tipos_modalidades_de_pagos` (
 `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `precio` DECIMAL(8,2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`usuarios` (
 `id` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(200) NULL,
  `pass` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_UNIQUE` (`user` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`empleados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_nombre` VARCHAR(200) NULL,
  `str_telefono` VARCHAR(200) NULL,
  `str_direccion` VARCHAR(200) NULL,
  `str_cedula` VARCHAR(200) NULL,
  `time_inicio_trabajo` TIME NULL,
  `time_fin_trabajo` TIME NULL,
  `usuario_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  FOREIGN KEY(`usuario_id`) REFERENCES `GymDB`.`usuarios`(`id`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`entrenadores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`entrenadores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `especialidad_id` INT NULL,
  `empleado_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `empleado_id_idx` (`empleado_id` ASC) VISIBLE,
  FOREIGN KEY(`empleado_id`) REFERENCES `GymDB`.`empleados`(`id`),
  FOREIGN KEY(`especialidad_id`) REFERENCES `GymDB`.`especialidades`(`id`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`especialidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`especialidades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`planes_de_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`planes_de_pagos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NULL,
  `entrenador_id` INT NULL,
  `tipo_modalidad_de_pago_id` INT NULL,
  `str_nombre_cliente` VARCHAR(200) NULL,
  `str_modalidad` VARCHAR(200) NULL,
  `estado_de_pago` ENUM('pendiente', 'pagado', 'atrasado') NULL,
  `date_fecha_de_vencimiento` DATE NULL,
  `date_fecha_de_pago` DATE NULL,
  `date_fecha_de_registro` DATE NULL,
  `date_fecha_de_actualizacion` DATE NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`cliente_id`) REFERENCES `GymDB`.`clientes`(`id`),
  FOREIGN KEY(`entrenador_id`) REFERENCES `GymDB`.`entrenadores`(`id`),
  FOREIGN KEY(`tipo_modalidad_de_pago_id`) REFERENCES `GymDB`.`tipos_modalidades_de_pagos`(`id`)
  )
  
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`mediciones_clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`mediciones_clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `entrenador_id` INT NULL,
  `cliente_id` INT NULL,
  `date_fecha_medicion` DATE NULL,
  `peso` DECIMAL NULL,
  `altura` DECIMAL NULL,
  `cintura` DECIMAL NULL,
  `piernas` DECIMAL NULL,
  `porcentaje_grasa_corporal` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`cliente_id`) REFERENCES `GymDB`.`clientes`(`id`),
  FOREIGN KEY(`entrenador_id`) REFERENCES `GymDB`.`entrenadores`(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `str_descripcion` VARCHAR(200) NULL,
  `precio` DECIMAL NULL,
  `iva` DECIMAL NULL,
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
  `producto_id` INT NULL,
  `id_stock` INT NULL,
  `cantidad` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`producto_id`) REFERENCES `GymDB`.`productos`(`id`),
  FOREIGN KEY(`id_stock`) REFERENCES `GymDB`.`stocks`(`id`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`facturas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NULL,
  `numero_factura` INT NULL,
  `date_fecha` DATE NULL,
  `timbrado` VARCHAR(200) NULL,
  `date_inicio_timbrado` DATE NULL,
  `date_fin_timbrado` DATE NULL,
  `str_nombre_cliente` VARCHAR(200) NULL,
  `str_ruc_cliente` VARCHAR(200) NULL,
  `condicion` BINARY NULL,
  `total` DECIMAL NULL,
  `saldo` DECIMAL NULL,
  `iva_5` DECIMAL NULL,
  `iva_10` DECIMAL NULL,
  `iva_exenta` DECIMAL NULL,
  FOREIGN KEY(`cliente_id`) REFERENCES `GymDB`.`clientes`(`id`),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`facturas_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`facturas_detalles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `factura_id` INT NULL,
  `producto_id` INT NULL,
  `subtotal` DECIMAL NULL,
  `cantidad` INT NULL,
  `precio` DECIMAL NULL,
  `iva` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`factura_id`) REFERENCES `GymDB`.`facturas`(`id`),
  FOREIGN KEY(`producto_id`) REFERENCES `GymDB`.`productos`(`id`)
  )
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
  `proveedor_id` INT NULL,
  `date_fecha` DATE NULL,
  `total` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`proveedor_id`) REFERENCES `GymDB`.`proveedores`(`id`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GymDB`.`facturas_proveedores_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GymDB`.`facturas_proveedores_detalles` (
 `id` INT NOT NULL AUTO_INCREMENT,
  `factura_proveedor_id` INT NULL,
  `producto_id` INT NULL,
  `stock_id` INT NULL,
  `cantidad` INT NULL,
  `precio_compra` DECIMAL NULL,
  `subtotal` DECIMAL NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`factura_proveedor_id`) REFERENCES `GymDB`.`facturas_proveedores`(`id`) 
  )
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
