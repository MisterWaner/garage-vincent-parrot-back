

/************* Creation of Database *****************/

CREATE USER 'garage_admin'@'localhost' IDENTIFIED BY 'Ecf_#2023!';
DROP DATABASE IF EXISTS garage;
CREATE DATABASE IF NOT EXISTS garage;

GRANT ALL PRIVILEGES ON garage.* TO 'garage_admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE garage;



