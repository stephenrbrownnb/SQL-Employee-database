const inquirer = require("inquirer");
const {viewAllEmployees, addEmployee, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment, quit, promptUser} =
require('./functions.js'); 
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
      database: 'employeeDatabase_db'
    },
    console.log(`Connected to the Employee Database.`)
);
    promptUser();

    module.export = {db};