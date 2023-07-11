
-- Creation of database's admin.
CREATE USER 'garage_admin'@'localhost' IDENTIFIED BY 'ECF_#2023!';

/************* Creation of Database *****************/

DROP DATABASE IF EXISTS garage;
CREATE DATABASE IF NOT EXISTS garage;
USE garage;

-- Creation of privileges for admin.
GRANT ALL PRIVILEGES ON garage.* TO 'garage_admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

/************* Creation of all tables ****************/

-- Admin table
DROP TABLE IF EXISTS admin;
CREATE TABLE IF NOT EXISTS admin(
    admin_id SMALLINT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_email VARCHAR(255) NOT NULL UNIQUE,
    admin_password VARCHAR(255) NOT NULL,
    admin_confirmation VARCHAR(255) NOT NULL,
    admin_firstname VARCHAR(50) NOT NULL,
    admin_lastname VARCHAR(50) NOT NULL
) ENGINE = InnoDB;

-- Employee table
DROP TABLE IF EXISTS employee;
CREATE TABLE IF NOT EXISTS employee(
    employee_id SMALLINT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_email VARCHAR(255) NOT NULL UNIQUE,
    employee_password VARCHAR(255) NOT NULL,
    employee_confirmation VARCHAR(255) NOT NULL,
    employee_firstname VARCHAR(50) NOT NULL,
    employee_lastname VARCHAR(50) NOT NULL
) ENGINE = InnoDB;

-- Slot table
DROP TABLE IF EXISTS slot;
CREATE TABLE IF NOT EXISTS slot(
    slot_id SMALLINT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slot_open_hour VARCHAR(30) NOT NULL,
    slot_close_hour VARCHAR(30) NOT NULL,
) ENGINE = InnoDB;

-- Day table
DROP TABLE IF EXISTS day ;
CREATE TABLE IF NOT EXISTS day(
    day_id SMALLINT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    day_name VARCHAR(30) NOT NULL,
    day_open VARCHAR(30) NOT NULL,
    slot_id SMALLINT(2) NOT NULL,
    CONSTRAINT fk_day_slot_id FOREIGN KEY (slot_id) REFERENCES slot (slot_id)
) ENGINE = InnoDB;

-- Service table
DROP TABLE IF EXISTS service;
CREATE TABLE IF NOT EXISTS service(
    service_id SMALLINT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(30) NOT NULL,
    service_description VARCHAR(255) NOT NULL,
    service_phone INT(10) NOT NULL,
    service_email VARCHAR(255) NOT NULL,
) ENGINE = InnoDB;

-- Reviews table
DROP TABLE IF EXISTS review;
CREATE TABLE IF NOT EXISTS review(
    review_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    review_author VARCHAR(255) NOT NULL,
    review_title VARCHAR(255) NOT NULL,
    review_message TEXT(1000) NOT NULL,
    review_date DATE NOT NULL,
    employee_id SMALLINT(2) NOT NULL,
    CONSTRAINT fk_review_employee_id FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
) ENGINE = InnoDB;

-- Cars table
DROP TABLE IF EXISTS car;
CREATE TABLE IF NOT EXISTS car(
    car_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    car_mark VARCHAR(255) NOT NULL,
    car_model VARCHAR(255) NOT NULL,
    car_year YEAR NOT NULL,
    car_km INT(6) NOT NULL,
    car_price DECIMAL(8,2) NOT NULL,
    employee_id SMALLINT(2) NOT NULL,
    CONSTRAINT fk_car_employee_id FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
) ENGINE = InnoDB;

-- Image table
DROP TABLE IF EXISTS image;
CREATE TABLE IF NOT EXISTS image(
    image_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    car_id INT(11) NOT NULL,
    CONSTRAINT fk_image_car_id FOREIGN KEY (car_id) REFERENCES car (car_id)
) ENGINE = InnoDB;