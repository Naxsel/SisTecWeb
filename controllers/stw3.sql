/**
* Autor: Alejandro Solanas Bonilla
* NIA: 647647
* Fichero: stw3.sql
* Fecha: 17/4/2016
* Funcion: Prepara la base de datos para el correcto funcionamiento del programa
*          Incluye una tarea de muestra.
*/

CREATE DATABASE IF NOT EXISTS stw3;

DROP TABLE IF EXISTS stw3.notes;

CREATE TABLE stw3.notes (
  id MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  fecha varchar(255),
  texto TEXT,
  fichero varchar(255),
  PRIMARY KEY (id)
) AUTO_INCREMENT=1;


INSERT INTO stw3.notes (fecha,texto,fichero) VALUES ('2016-04-02','Texto','nodejs-light.png');
