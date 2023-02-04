
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
    console.table("Viewing all employees... \n");
    db.query(
    `SELECT e.id, e.first_name, e.last_name, r.title AS title, r.salary AS salary,(SELECT concat(first_name, ' ', last_name) FROM employee WHERE id = e.manager_id) AS Manager
    FROM employee e LEFT JOIN role r ON e.role_id = r.id;`,
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
      db.query("SELECT id, first_name, last_name FROM employee", function (err, employees) {
          if (err) throw err;
          const employeeNames = employees.map(employee => `${employee.first_name} ${employee.last_name}`);
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
                type: 'list',
                message: 'Select the employee`s manager:',
                choices: employeeNames
              }
            ])
            .then(answers => {
              const selectedRole = roles.find(role => role.title === answers.role_id);
              const selectedManager = employees.find(employee => `${employee.first_name} ${employee.last_name}` === answers.manager_id);
              db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${selectedRole.id}', '${selectedManager.id}')`, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                promptUser();
              });
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
    console.table("Viewing all roles...");
    db.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id`,
    function(err,res){
        if (err) throw err;
        console.table(res);
        promptUser();
    });
    
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
    console.table("Viewing all departments...");
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
function updateEmployeeManager() {
console.log("Updating Employee's Manager");
db.query("SELECT id, first_name, last_name FROM employee", function(err, employees) {
  if (err) throw err;
 let employeeChoices = employees.map(employee => {
    return {
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    };
  });
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the new manager?",
        choices: employeeChoices
      }
    ])
    .then(answers => {
      db.query(`UPDATE employee SET manager_id = ${answers.manager_id} WHERE id = ${answers.employee_id}`, function(err, result) {
        if (err) throw err;
        console.log("Employee manager updated successfully!");
        promptUser();
      });
    });
});
}
function viewEmployeesManager() {
  db.query("SELECT id, first_name, last_name FROM employee", function(err, employees) {
    if (err) throw err;
  
    let employeeChoices = employees.map(employee => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      };
    });
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "manager_id",
          message: "Which manager would you like to view employees for?",
          choices: employeeChoices
        }
      ])
      .then(answers => {
        db.query(`
          SELECT employee.id, employee.first_name, employee.last_name, role.title
          FROM employee
          JOIN role ON employee.role_id = role.id
          WHERE employee.manager_id = ${answers.manager_id}
        `, function(err, employees) {
          if (err) throw err;
  
          if (employees.length === 0) {
            console.log("No employees found for this Nanager, Perhaps they are not a Manager.");
          } else {
            console.log("Employees:");
            employees.forEach(employee => {
              console.log(`${employee.first_name} ${employee.last_name} - ${employee.title}`);
            });
          }
          promptUser();
        });
      });
  });
}
function viewemployeesDepartment() {
  console.log('Viewing Employees by Department');
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
          type: "list",
          name: "department_id",
          message: "Which department would you like to view employees for?",
          choices: departmentChoices
        }
      ])
      .then(answers => {
        db.query(`
          SELECT employee.id, employee.first_name, employee.last_name, role.title
          FROM employee
          JOIN role ON employee.role_id = role.id
          WHERE role.department_id = ${answers.department_id}
        `, function(err, employees) {
          if (err) throw err;

          if (employees.length === 0) {
            console.log("No employees found in this department.");
          } else {
            console.log("Employees:");
            employees.forEach(employee => {
              console.log(`${employee.first_name} ${employee.last_name} - ${employee.title}`);
            });
          }
          promptUser();
        });
      });
  });
}
function choiceDelete() {
  console.log('Choose what to delete');
  
inquirer
.prompt([
  {
    type: "list",
    name: "choice",
    message: "What would you like to delete?",
    choices: [
      "Department",
      "Role",
      "Employee"
    ]
  }
])
.then(answer => {
  switch (answer.choice) {
    case "Department":
      deleteDepartment();
      break;
    case "Role":
      deleteRole();
      break;
    case "Employee":
      deleteEmployee();
      break;
  }

});
function deleteDepartment() {
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
          type: "list",
          name: "department_id",
          message: "Which department would you like to delete?",
          choices: departmentChoices
        }
      ])
      .then(answers => {
        db.query(`DELETE FROM department WHERE id = ${answers.department_id}`, function(err, result) {
          if (err) throw err;
          console.log("Department deleted successfully!");
          promptUser();
        });
      });
  });
}

function deleteRole() {
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
          name: "role_id",
          message: "Which role would you like to delete?",
          choices: roleChoices
        }
      ])
      .then(answers => {
        db.query(`DELETE FROM role WHERE id = ${answers.role_id}`, function(err, result) {
          if (err) throw err;
          console.log("Role deleted successfully!");
          promptUser();
        });
      });
  });}
  function deleteEmployee() {
    db.query("SELECT id, first_name, last_name FROM employee", function(err, employees) {
      if (err) throw err;
      let employeeChoices = employees.map(employee => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        };
      });
    
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_id",
            message: "Which employee would you like to delete?",
            choices: employeeChoices
          }
        ])
        .then(answers => {
          db.query(`DELETE FROM employee WHERE id = ${answers.employee_id}`, function(err, result) {
            if (err) throw err;
            console.log("Employee deleted successfully!");
            promptUser();
          });
        });
    });
}
 }
function viewBudget() {
  console.log('Viewing Budget by Department');
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
          type: "list",
          name: "department_id",
          message: "Which department's budget would you like to view?",
          choices: departmentChoices
        }
      ])
      .then(answers => {
        db.query(`
          SELECT department.name, SUM(role.salary) as total_salary
          FROM department
          JOIN role ON department.id = role.department_id
          JOIN employee ON role.id = employee.role_id
          WHERE department.id = ${answers.department_id}
          GROUP BY department.id
        `, function(err, result) {
          if (err) throw err;
          console.log(`Total salary for ${result[0].name} department is $${result[0].total_salary}.`);
          promptUser();
        });
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
            "Update employee Managers",
            "View employees by Manager",
            "View employees by Department",
            "Delete Departments, roles or Employees",
            "View Total budget of a department",
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
            case "Update employee Managers":
                updateEmployeeManager();
                break;
            case "View employees by Manager":
                viewEmployeesManager();
                break;
            case "View employees by Department":
                viewemployeesDepartment();
                break;
            case "Delete Departments, roles or Employees":
                choiceDelete();
                break;
            case "View Total budget of a department":
              viewBudget();
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