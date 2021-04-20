const inquirer = require('inquirer');
const {
    createPromptModule
} = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db'
});

connection.connect((err) => {
    if (err) throw err;
    runApp();
});

const runApp = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Create department', 'Create employee', 'Create role', 'View departments', 'View employees', 'View roles', 'Update employee'],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Create department':
                    createDepartment();
                    break;

                case 'Create employee':
                    createEmployee();
                    break;

                case 'Create role':
                    createRole();
                    break;

                case 'View departments':
                    viewDepartments();
                    break;

                case 'View employees':
                    viewEmployees();
                    break;

                case 'View roles':
                    viewRoles();
                    break;

                case 'Update employee':
                    updateEmployee();
                    break

                case 'Exit': // if 'Exit' is selected then the app ends
                    connection.end();
                    break;

                default: // Default is to prompt actions
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
};

const createDepartment = () => {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'What department would you like to add?',
        })
        .then((answer) => {
            // INSERT INTO department(name), VALUE(answer)
            console.log(`You added a ${answer.department} department.`)
        });
};

const createEmployee = () => {
        inquirer
            .prompt ([{
                type: 'input',
                name: 'firstName',
                message: 'Enter employee first name'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter employee last name'
            },
            {
                type: 'input',
                name: 'roleId',
                message: "What is employee's role?",
                choices: ['Manager', 'Engineer']

            },
            {
                // not sure how to ask this question. Do I need to ask if employee is a manager first like other HW assignment?
                type: 'input',
                name: 'managerId',
                message: "Who is this employee's manager?"
            },
        ])
        .then((answer) => {
            //pull data from workbench to get table to appear with headers at top and info displayed in rows.
           console.table(answer) 
        });
    };

                // const createRole = () => {

                // };

                // const viewDepartments = () => {

                // };

                // const viewEmployees = () => {

                // };

                // const viewRoles = () => {

                // };

                // const updateEmployee = () => {

                // };

             