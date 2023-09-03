/************* Creation of Database *****************/

-- Creation of user admin for database
DROP USER IF EXISTS 'vincent.parrot'@'localhost';
CREATE USER IF NOT EXISTS 'vincent.parrot'@'localhost' IDENTIFIED BY 'Ecf_#2023!';

-- Creation of database
DROP DATABASE IF EXISTS garage;
CREATE DATABASE IF NOT EXISTS garage;

-- Give privileges on database to user admin
GRANT ALL PRIVILEGES ON garage.* TO 'vincent.parrot'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE garage;



