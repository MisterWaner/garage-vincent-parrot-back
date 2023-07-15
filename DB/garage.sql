/************* Creation of Database *****************/

--Creation of user admin for database
CREATE USER 'garage_admin'@'localhost' IDENTIFIED BY 'Ecf_#2023!';

-- Creation of database
DROP DATABASE IF EXISTS garage;
CREATE DATABASE IF NOT EXISTS garage;

-- Give privileges on database to user admin
GRANT ALL PRIVILEGES ON garage.* TO 'garage_admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE garage;



