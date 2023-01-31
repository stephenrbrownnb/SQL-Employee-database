
const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
     // MYSQL database name
      database: 'employeeDatabase_db'
    }
);



function viewAllEmployees() {
    console.log("Viewing all employees... \n");
    db.query("Select * from employee",
    function(err,res){
        if (err) throw err;
        console.table(res);
        promptUser();
    });
     
}
function addEmployee() {
    console.log("Adding a new employee...");
    db.query("SELECT id, title FROM role", function (err, roles) {
        if (err) throw err;
        const roleTitles = roles.map(role => role.title);
        inquirer
          .prompt([
            {
              name: 'first_name',
              type: 'input',
              message: 'Enter the employee`s first name:'
            },
            {
              name: 'last_name',
              type: 'input',
              message: 'Enter the employee`s last name:'
            },
            {
              name: 'role_id',
              type: 'list',
              message: 'Select the employee`s role:',
              choices: roleTitles
            },
            {
              name: 'manager_id',
              type: 'input',
              message: 'Enter the employee`s manager id:'
            }
          ])
          .then(answers => {
            const selectedRole = roles.find(role => role.title === answers.role_id);
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${selectedRole.id}', '${answers.manager_id}')`, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
              promptUser();
            });
          });
    });
}
function updateEmployeeRole() {
    console.log("Updating employee role...");
      
      db.query("SELECT id, first_name, last_name FROM employee", function(err, employees) {
        if (err) throw err;
    
       
        let employeeChoices = employees.map(employee => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          };
        });
        db.query("SELECT id, title FROM role", function(err, roles) {
          if (err) throw err;
    
       
          let roleChoices = roles.map(role => {
            return {
              name: role.title,
              value: role.id
            };
          });
    
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee_id",
                message: "Which employee's role do you want to update?",
                choices: employeeChoices
              },
              {
                type: "list",
                name: "role_id",
                message: "What is the new role?",
                choices: roleChoices
              }
            ])
            .then(answers => {
            
              //let sql = `UPDATE employee SET role_id = ${answers.role_id} WHERE id = ${answers.employee_id}`;
    
              db.query(`UPDATE employee SET role_id = ${answers.role_id} WHERE id = ${answers.employee_id}`, function(err, result) {
                if (err) throw err;
                console.log("Employee role updated successfully!");
                promptUser();
              });
            });
        });
      })

   
}
function viewAllRoles() {
    console.log("Viewing all roles...");
    db.query("Select * from role",
    function(err,res){
        if (err) throw err;
        console.table(res);
    });
    promptUser();
}
function addRole() {
    console.log("Adding a new role...");
    db.query("SELECT id, name FROM department", function(err, departments) {
        if (err) throw err;
      
      
        let departmentChoices = departments.map(department => {
          return {
            name: department.name,
            value: department.id
          };
        });
      
        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "What is the title of the role?"
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary of the role?"
            },
            {
              type: "list",
              name: "department_id",
              message: "Which department does this role belong to?",
              choices: departmentChoices
            }
          ])
          .then(answers => {
           
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, ${answers.department_id})`, function(err, result) {
              if (err) throw err;
              console.log("Role added successfully!");
              promptUser();
            });
          });
      });
  
}
function viewAllDepartments() {
    console.log("Viewing all departments...");
    db.query("Select * from department",
    function(err,res){
        if (err) throw err;
        console.table(res);
        console.log()
        promptUser();
    });
    
}
function addDepartment() {
    console.log("Adding a new department...");
    inquirer.prompt([{
        name: 'departmentName',
        type: 'input',
        message: 'Enter the name of the Department:'
    }]).then(answers => {
        db.query(`INSERT INTO department (name) Values('${answers.departmentName}')`, (error, results) => {
            if (error) throw error;
            console.log("1 record inserted");
            promptUser();
        });
    });
}
function quit() {
    console.log("Exiting...");
}

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

module.exports = {viewAllEmployees, addEmployee, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment, quit, promptUser}