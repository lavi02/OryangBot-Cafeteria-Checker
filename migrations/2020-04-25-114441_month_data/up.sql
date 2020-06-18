-- Your SQL goes here
CREATE TABLE `get_month_data` (
	`state` VARCHAR(6) NOT NULL,
	`count` INT NOT NULL,
	`code` VARCHAR(256) NOT NULL,
	`date` DATETIME NOT NULL,
    PRIMARY KEY (`code`)
) CHARSET=utf8;