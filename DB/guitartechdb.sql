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
  `visible` TINYINT NULL,
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
  `visible` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tuning`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tuning` ;

CREATE TABLE IF NOT EXISTS `tuning` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
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
  `tuning_id` INT NOT NULL,
  `scale_length` DECIMAL(4,2) NULL,
  `number_of_frets` INT NULL,
  `number_of_strings` INT NULL,
  `bridge` VARCHAR(45) NULL,
  `purchase_price` DECIMAL(7,2) NULL,
  `currency` VARCHAR(45) NULL,
  `bridge_pickup` VARCHAR(45) NULL,
  `middle_pickup` VARCHAR(45) NULL,
  `neck_pickup` VARCHAR(45) NULL,
  `serial_number` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_guitar_user1_idx` (`user_id` ASC),
  INDEX `fk_guitar_tuning1_idx` (`tuning_id` ASC),
  CONSTRAINT `fk_guitar_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_guitar_tuning1`
    FOREIGN KEY (`tuning_id`)
    REFERENCES `tuning` (`id`)
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
  `deleted` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_guitar_picture_guitar_idx` (`guitar_id` ASC),
  CONSTRAINT `fk_guitar_picture_guitar`
    FOREIGN KEY (`guitar_id`)
    REFERENCES `guitar` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `setup`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `setup` ;

CREATE TABLE IF NOT EXISTS `setup` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `string_gauge` VARCHAR(45) NULL,
  `string_brand` VARCHAR(45) NULL,
  `date_of_setup` DATE NULL,
  `action_treble` INT NULL,
  `action_bass` INT NULL,
  `notes` VARCHAR(2000) NULL,
  `guitar_id` INT NOT NULL,
  `tuning_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_setup_guitar1_idx` (`guitar_id` ASC),
  INDEX `fk_setup_tuning1_idx` (`tuning_id` ASC),
  CONSTRAINT `fk_setup_guitar1`
    FOREIGN KEY (`guitar_id`)
    REFERENCES `guitar` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_setup_tuning1`
    FOREIGN KEY (`tuning_id`)
    REFERENCES `tuning` (`id`)
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
INSERT INTO `user` (`id`, `username`, `password`, `role`, `active`, `created_at`, `updated_at`, `last_login`, `email`, `visible`) VALUES (1, 'jmartz', '$2a$10$m6QVCQEkIxjCmIgakgf6UufroZ1l3SNynyYiKRUy.inLSzVxjMk5S', 'admin', 1, '2023-09-20 15:55:23', '2023-09-20 15:55:23', '2023-09-20 15:55:23', 'justin@justinmartz.dev', 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `active`, `created_at`, `updated_at`, `last_login`, `email`, `visible`) VALUES (2, 'sally', '$2a$10$m6QVCQEkIxjCmIgakgf6UufroZ1l3SNynyYiKRUy.inLSzVxjMk5S', 'player', 1, '2023-10-30 22:22:22', '2023-10-30 22:22:22', '2023-10-30 22:22:22', 'sally@test.com', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `tuning`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitartechdb`;
INSERT INTO `tuning` (`id`, `name`) VALUES (1, 'E Standard');
INSERT INTO `tuning` (`id`, `name`) VALUES (2, 'Eb Standard');
INSERT INTO `tuning` (`id`, `name`) VALUES (3, 'D Standard');
INSERT INTO `tuning` (`id`, `name`) VALUES (4, 'C# Standard');

COMMIT;


-- -----------------------------------------------------
-- Data for table `guitar`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitartechdb`;
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `deleted`, `user_id`, `tuning_id`, `scale_length`, `number_of_frets`, `number_of_strings`, `bridge`, `purchase_price`, `currency`, `bridge_pickup`, `middle_pickup`, `neck_pickup`, `serial_number`) VALUES (1, 'Gibson', 'Les Paul Custom', 2017, 'Ebony', 0, 1, 2, 24.75, 22, 6, 'Tune-O-Matic', 4499.00, 'USD', '498T', NULL, '490R', 'CS703022');
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `deleted`, `user_id`, `tuning_id`, `scale_length`, `number_of_frets`, `number_of_strings`, `bridge`, `purchase_price`, `currency`, `bridge_pickup`, `middle_pickup`, `neck_pickup`, `serial_number`) VALUES (2, 'Gibson', 'Explorer', 2022, 'Ebony', 0, 1, 3, 24.75, 22, 6, 'Aluminum Nashville Tune-O-Matic', 2499.00, 'USD', '80s Tribute', NULL, '80s Tribute', '207930196');
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `deleted`, `user_id`, `tuning_id`, `scale_length`, `number_of_frets`, `number_of_strings`, `bridge`, `purchase_price`, `currency`, `bridge_pickup`, `middle_pickup`, `neck_pickup`, `serial_number`) VALUES (3, 'Kramer', 'The 84 Hot Dogger', 2023, 'Mustard Yellow', 0, 2, 1, 25.5, 22, 6, 'Floyd Rose', 999, 'USD', 'SH4 JB', NULL, NULL, '23012901189');

COMMIT;


-- -----------------------------------------------------
-- Data for table `guitar_picture`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitartechdb`;
INSERT INTO `guitar_picture` (`id`, `filename`, `guitar_id`, `order`, `deleted`) VALUES (1, 'lpc.jpg', 1, 1, 0);
INSERT INTO `guitar_picture` (`id`, `filename`, `guitar_id`, `order`, `deleted`) VALUES (2, 'explorer.png', 2, 1, 0);
INSERT INTO `guitar_picture` (`id`, `filename`, `guitar_id`, `order`, `deleted`) VALUES (3, 'hotdog.webp', 3, 1, 0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `setup`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitartechdb`;
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (1, '10-46', 'D\'Addario NYXL', '2023-05-05', 3, 3, 'A little light, maybe try 10-48/52 next time', 1, 2);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (2, '11-50', 'D\'Addario XL', '2023-06-02', 3, 4, 'A little light, maybe try 11-52 next time', 2, 3);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (3, '11-49', 'D\'Addario NYXL', '2023-08-15', 3, 4, 'I am stupid. These are lighter than the last set.', 2, 3);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (4, '11-52', 'D\'Addario XL', '2023-10-03', 3, 4, 'Really good. I think this is it for this tuning at this scale length.', 2, 3);

COMMIT;

