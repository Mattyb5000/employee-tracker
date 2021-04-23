const inquirer = require('inquirer');
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
            choices: ['View all employees', 'View all employees by department', 'View all employees by manager', 'Add employee', 'Remove employee', 'Update employee role', 'Update employee manager', 'View all roles', 'Add role', 'Remove role'],
        })
        .then((answer) => {
            // clean this up
            switch (answer.action) {
                case 'View all employees':
                    viewEmployees();
                    break;

                case 'View all employees by department':
                    viewEmpDept();
                    break;

                case 'View all employees by manager':
                    viewEmpMgr();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Remove employee':
                    removeEmployee();
                    break;

                case 'Update employee role':
                    updateRole();
                    break;

                case 'Update employee manager':
                    updateEmpMgr();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Remove role':
                    removeRole();
                    break;

                case 'Exit': // if 'Exit' is selected then the app ends
                    connection.end();
                    break;

                default: // Default is to prompt actions
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
};

const viewEmployees = () => {
    connection.query(`SELECT first_name, last_name, title, salary
    FROM employee
    INNER JOIN employee_tracker_db.role
    ON employee.role_id = employee_tracker_db.role.id;`, (err, results) => {
        if (err) throw err;
        console.table(results) //display employee info via table
        runApp();
    })
}


// const viewEmpDept = () => {
//     inquirer
//         .prompt([{
//             type: 'list',
//             name: 'employeeDept',
//             message: 'Choose an employee to view their department.',
//             choices: [] // populated by employees that have been created
//         }])
//         .then((answer) => {
//             console.log(answer);
//             runApp();
//         })
// };

// const viewEmpMgr = () => {
//     inquirer
//         .prompt([{
//             type: 'list',
//             name: 'employeeName',
//             message: 'Choose an employee to view their manager.',
//             choices: [] // populated by employees that have been created
//         }])
//         .then((answer) => {
//             console.log(answer);
//             runApp();
//         })
// };

const addEmployee = () => {
    inquirer
        .prompt([{
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
                message: 'Enter role id'
            },
        ])
        .then((answer) => {
            connection.query(`INSERT INTO employee(first_name, last_name, role_id) VALUE('${answer.firstName}', '${answer.lastName}', '${answer.roleId}')`)
            console.table(answer)
            runApp();

        });
};
//remove employee from list provided
// const removeEmployee = () => {
//     inquirer
//         .prompt([{
//             type: 'list',
//             name: 'removeEmp',
//             message: 'Choose which employee you want to remove.',
//             choices: [] //employees created will populate here
//         }, ])
//         .then((answer) => {
//             // DELETE employee
//             console.table(answer)
//             runApp();
//         })
// };

// const updateRole = () => {
//     inquirer
//         .prompt([{
//             type: 'list',
//             name: 'employee',
//             message: 'Choose which employee you want to update.',
//             choices: [] //employees created will populate here
//         }, ])
//         .then((answer) => {
//             // code to change this employee's information
//             console.table(answer.employee)
//             runApp();
//         })
// };

// const updateEmpMgr = () => {

// };

// const viewRoles = () => {

// };

// const addRole = () => {

// };

// const removeRole = () => {

// };