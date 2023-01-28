const inquirer = require("inquirer");
const {viewAllEmployees, addEmployee, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment, quit} =
require('./functions.js'); 


function promptUser() {
    inquirer
    .prompt([
        {
        type: "list",
        message: "What would you like to do? (Use Arrow Keys)",
        name: "user_selection",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit",
        ],
        message: "Move up or down to reveal more choices",
        },
    ])
    .then((data) => {
        switch (data.user_selection) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Quit":
                quit();
                break;
            default:
                console.log("Invalid selection");
        }
    });
}


promptUser();

module.exports = {promptUser};
