CREATE DATABASE IF NOT EXISTS stw3;

DROP TABLE IF EXISTS stw3.notes;

CREATE TABLE stw3.notes (
  id MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  fecha varchar(255),
  texto TEXT,
  fichero varchar(255),
  PRIMARY KEY (id)
) AUTO_INCREMENT=1;


INSERT INTO stw3.notes (fecha,texto,fichero) VALUES ("01/01/1111","Texto","nodejs-light.png");
