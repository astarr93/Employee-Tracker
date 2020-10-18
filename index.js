const figlet = require("figlet");
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const { menuOperator } = require('./lib/inquirer');
const dotenv = require('dotenv');

// ASCII Art to Start Program
figlet("Employee\n  Manager", function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data + "\n");
    };
    init();
});


//  App start
function init() {

    // Prep local SQL database connection by reading .env
    dotenv.config();
    const connection = mysql.createConnection({
        host: process.env.host,
        port: process.env.port,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });

    // Create connection to mysql database

    connection.connect((err) => {
        if (err) throw err;
    });

    // Use inquirer.js to interact with database
    menu();

    function menu() {
        inquirer.prompt(menuOperator).then(answers => {
            switch (true) {
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all departments')):
                    getAllDepartments();
                    break;
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all employees')):
                    getAllEmployees();
                    break;
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all roles')):
                    getAllRoles();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new department')):
                    console.log(4);
                    // addNewDepartment();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new employee')):
                    console.log(5);
                    // addNewEmployee();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new role')):
                    console.log(6);
                    // addNewRole();
                    break;
                case ((answers.menu === 'Update corporate data') && (answers.menuUpdate === 'Update employee manager')):
                    console.log(7);
                    // UpdateEmployeeManager();
                    break;
                case ((answers.menu === 'Update corporate data') && (answers.menuUpdate === 'Update employee role')):
                    console.log(8);
                    // UpdateEmployeeRole();
                    break;
                case ((answers.menu === 'Delete corporate data') && (answers.menuDelete === 'DELETE employee manager')):
                    console.log(10);
                    // deleteEmployeeManager();
                    break;
                case ((answers.menu === 'Delete corporate data') && (answers.menuDelete === 'DELETE employee role')):
                    console.log(11);
                    // deleteEmployeeRole();
                    break;
            };
        });
    };

    // View Corporate Data Functions

    function getAllDepartments() {
        connection.query('SELECT id AS "Id", name AS "Name" FROM department', (err, results) => {
            if (err) throw (err);
            console.log('\n');
            console.table(results);
            menu();
        });
    };

    function getAllEmployees() {
        connection.query(
            `SELECT e.id AS "Id",
                CONCAT(e.first_name, " ", e.last_name) AS "Name",
                r.title AS "Title",
                d.name AS "Department",
                r.salary AS "Salary",
                CONCAT (m.first_name, " ", m.last_name) AS "Manager",
             IFNULL(e.manager_id, 'n/a') AS "Manager"
             FROM employee e
             LEFT JOIN role r
             ON r.id = e.role_id
             LEFT JOIN department d
             ON d.id = r.department_id
             LEFT JOIN employee m
             ON m.id = e.manager_id`, (err, results) => {
            if (err) throw (err);
            console.log('\n');
            let test = results
            // console.log(test);
            console.table(results);
            menu();
        });
    };

    function getAllRoles() {
        connection.query('SELECT  FROM role', (err, results) => {
            if (err) throw (err);
            console.log('\n');
            console.table(results);
            menu();
        });
    };

    // function quitProgram() {
    //     connectSQL.end();
    //     process.exit();
    // }
};