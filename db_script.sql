-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(64) NOT NULL,
  `permissions` INT NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `profilepic` VARCHAR(255) NULL,
  `occupation` VARCHAR(64) NULL,
  `organization` VARCHAR(45) NULL,
  `phone` VARCHAR(20) NULL,
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`pairings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pairings` (
  `pairingid` INT NOT NULL AUTO_INCREMENT,
  `mentorid` INT NOT NULL,
  `menteeid` INT NOT NULL,
  PRIMARY KEY (`pairingid`),
  INDEX `fk_pairings_users_idx` (`mentorid` ASC),
  INDEX `fk_pairings_users1_idx` (`menteeid` ASC),
  CONSTRAINT `fk_pairings_users`
    FOREIGN KEY (`mentorid`)
    REFERENCES `mydb`.`users` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pairings_users1`
    FOREIGN KEY (`menteeid`)
    REFERENCES `mydb`.`users` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`phases`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`phases` (
  `phaseid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  PRIMARY KEY (`phaseid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`dashboards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`dashboards` (
  `dashboardid` INT NOT NULL AUTO_INCREMENT,
  `meetingtime` DATETIME NULL,
  `parentdashboardid` INT NOT NULL,
  `pairingid` INT NOT NULL,
  `currentphaseid` INT NOT NULL,
  `currentphasestatus` INT NOT NULL,
  PRIMARY KEY (`dashboardid`),
  INDEX `fk_dashboards_pairings1_idx` (`pairingid` ASC),
  INDEX `fk_dashboards_phases1_idx` (`currentphaseid` ASC),
  CONSTRAINT `fk_dashboards_pairings1`
    FOREIGN KEY (`pairingid`)
    REFERENCES `mydb`.`pairings` (`pairingid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dashboards_phases1`
    FOREIGN KEY (`currentphaseid`)
    REFERENCES `mydb`.`phases` (`phaseid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`doclinks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`doclinks` (
  `doclinkid` INT NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(256) NOT NULL,
  `dashboardid` INT NOT NULL,
  `phaseid` INT NOT NULL,
  PRIMARY KEY (`doclinkid`),
  INDEX `fk_doclinks_dashboards1_idx` (`dashboardid` ASC),
  INDEX `fk_doclinks_phases1_idx` (`phaseid` ASC),
  CONSTRAINT `fk_doclinks_dashboards1`
    FOREIGN KEY (`dashboardid`)
    REFERENCES `mydb`.`dashboards` (`dashboardid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_doclinks_phases1`
    FOREIGN KEY (`phaseid`)
    REFERENCES `mydb`.`phases` (`phaseid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

