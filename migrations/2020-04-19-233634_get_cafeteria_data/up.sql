-- Your SQL goes here
CREATE TABLE `cafeteria_data` (
	`user` VARCHAR(256) NOT NULL,
	`data` INTEGER NOT NULL,
	`number` INTEGER NOT NULL,
	`ip` VARCHAR(256) NOT NULL,
	`date` DATETIME NOT NULL,
    PRIMARY KEY (`user`)
) CHARSET=utf8;