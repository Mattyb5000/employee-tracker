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
                    createPromptModule();
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
}