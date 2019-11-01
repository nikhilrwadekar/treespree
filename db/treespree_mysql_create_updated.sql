	CREATE TABLE `trees` (
		`tree_id` INT NOT NULL AUTO_INCREMENT,
		`tree_planted` DATE,
		`tree_diameter` FLOAT NOT NULL,
		`tree_latitude` DOUBLE NOT NULL,
		`tree_longitude` DOUBLE NOT NULL,
		`neighbourhood_id` INT NOT NULL,
		`genus_id` INT NOT NULL,
		`species_id` INT NOT NULL,
		`common_name_id` INT NOT NULL,
		PRIMARY KEY (`tree_id`)
	);

	CREATE TABLE `neighbourhoods` (
		`neighbourhood_id` INT NOT NULL AUTO_INCREMENT,
		`neighbourhood_name` VARCHAR(50) NOT NULL,
		PRIMARY KEY (`neighbourhood_id`),
		UNIQUE (`neighbourhood_name`)

	);

	CREATE TABLE `genus` (
		`genus_id` INT NOT NULL AUTO_INCREMENT,
		`genus_name` VARCHAR(50) NOT NULL,
		PRIMARY KEY (`genus_id`),
		UNIQUE (`genus_name`)
	);
	-- One Absolute Common Name -- Many Common Names - eg. -- Maple; -- Red Maple; Green Maple
	CREATE TABLE `common_names` (
		`common_name_id` INT NOT NULL AUTO_INCREMENT,
		`common_name_tree` VARCHAR(50) NOT NULL,
		`absolute_common_name_id` INT DEFAULT NULL,
		PRIMARY KEY (`common_name_id`),
		UNIQUE (`common_name_tree`)
	);

	CREATE TABLE `absolute_common_names` (
		`absolute_common_name_id` INT NOT NULL AUTO_INCREMENT,
		`absolute_common_name_tree` VARCHAR(50) NOT NULL,
		PRIMARY KEY (`absolute_common_name_id`),
		UNIQUE (`absolute_common_name_tree`)
	);

	CREATE TABLE `species` (
		`species_id` INT NOT NULL AUTO_INCREMENT,
		`species_name` VARCHAR(50) NOT NULL,
		PRIMARY KEY (`species_id`),
		UNIQUE (`species_name`)
	);

	ALTER TABLE `trees` ADD CONSTRAINT `trees_fk0` FOREIGN KEY (`neighbourhood_id`) REFERENCES `neighbourhoods`(`neighbourhood_id`);

	ALTER TABLE `trees` ADD CONSTRAINT `trees_fk1` FOREIGN KEY (`genus_id`) REFERENCES `genus`(`genus_id`);

	ALTER TABLE `trees` ADD CONSTRAINT `trees_fk2` FOREIGN KEY (`species_id`) REFERENCES `species`(`species_id`);

	ALTER TABLE `trees` ADD CONSTRAINT `trees_fk3` FOREIGN KEY (`common_name_id`) REFERENCES `common_names`(`common_name_id`);

	ALTER TABLE `common_names` ADD CONSTRAINT `common_names_fk1` FOREIGN KEY (`absolute_common_name_id`) REFERENCES `absolute_common_names`(`absolute_common_name_id`);
