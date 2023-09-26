-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema guitartechdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `guitartechdb` ;

-- -----------------------------------------------------
-- Schema guitartechdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `guitartechdb` DEFAULT CHARACTER SET utf8 ;
USE `guitartechdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(45) NULL,
  `active` TINYINT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `last_login` DATETIME NULL,
  `email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(45) NULL,
  `active` TINYINT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `last_login` DATETIME NULL,
  `email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `guitar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `guitar` ;

CREATE TABLE IF NOT EXISTS `guitar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `make` VARCHAR(45) NULL,
  `model` VARCHAR(100) NULL,
  `year` INT NULL,
  `color` VARCHAR(45) NULL,
  `deleted` TINYINT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_guitar_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_guitar_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `guitar_picture`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `guitar_picture` ;

CREATE TABLE IF NOT EXISTS `guitar_picture` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(100) NULL,
  `guitar_id` INT NOT NULL,
  `order` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_guitar_picture_guitar_idx` (`guitar_id` ASC),
  CONSTRAINT `fk_guitar_picture_guitar`
    FOREIGN KEY (`guitar_id`)
    REFERENCES `guitar` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS guitartech;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'guitartech' IDENTIFIED BY 'guitartech';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'guitartech';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitartechdb`;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `active`, `created_at`, `updated_at`, `last_login`, `email`) VALUES (1, 'jmartz', 'changeme', 'admin', 1, '2023-09-20 15:55:23', '2023-09-20 15:55:23', '2023-09-20 15:55:23', 'justin@justinmartz.dev');

COMMIT;


-- -----------------------------------------------------
-- Data for table `guitar`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitartechdb`;
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `deleted`, `user_id`) VALUES (1, 'Gibson', 'Les Paul Custom', 2017, 'Ebony', 0, 1);

COMMIT;

