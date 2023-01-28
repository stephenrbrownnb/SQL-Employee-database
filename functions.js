const {promptUser} = require('./index.js');





function viewAllEmployees() {
    console.log("Viewing all employees...");
    promptUser();
}
function addEmployee() {
    console.log("Adding a new employee...");
    promptUser();
}
function updateEmployeeRole() {
    console.log("Updating employee role...");
    promptUser();
}
function viewAllRoles() {
    console.log("Viewing all roles...");
    promptUser();
}
function addRole() {
    console.log("Adding a new role...");
    promptUser();
}
function viewAllDepartments() {
    console.log("Viewing all departments...");
    promptUser();
}
function addDepartment() {
    console.log("Adding a new department...");
    promptUser();
}
function quit() {
    console.log("Exiting...");
}



module.exports = {viewAllEmployees, addEmployee, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment, quit}