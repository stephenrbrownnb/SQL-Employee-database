DROP DATABASE IF EXISTS employeeDatabase_db;
CREATE DATABASE employeeDatabase_db;

USE employeeDatabase_db;

CREATE TABLE department(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 );

CREATE TABLE role(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title varchar(30),
  salary decimal,
  department_id int,
  FOREIGN KEY (department_id)
  REFERENCES department(id) ON DELETE CASCADE
 );

CREATE TABLE employee(
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id) on delete cascade
 );

 SELECT * FROM employee
JOIN role
ON employee.role_id = role.id;

SELECT * FROM role
JOIN department
ON role.department_id = department.id;