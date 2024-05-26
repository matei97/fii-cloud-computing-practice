CREATE DATABASE Clouding;

USE Clouding;

CREATE TABLE Accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    group_name VARCHAR(255) NOT NULL
);

SELECT * FROM Accounts;