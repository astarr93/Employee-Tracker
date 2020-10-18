const figlet = require("figlet");
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const { menuOperator, newEmployeeSurvey } = require('./lib/inquirer');
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
                    viewAllDepartments();
                    break;
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all employees')):
                    viewAllEmployees();
                    break;
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all roles')):
                    viewAllRoles();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new department')):
                    // addNewDepartment();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new employee')):
                    addNewEmployee();
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

    function viewAllDepartments() {
        connection.query('SELECT id AS "Id", name AS "Name" FROM department', (err, results) => {
            if (err) throw (err);
            console.log('\n');
            console.table(results);
        });
        menu();
    };

    function viewAllEmployees() {
        connection.query(
            `SELECT e.id AS "Id",
                CONCAT(e.first_name, " ", e.last_name) AS "Name",
                r.title AS "Title",
                d.name AS "Department",
                r.salary AS "Salary",
                CONCAT(m.first_name, " ", m.last_name) AS "Manager"
             FROM employee e
             LEFT JOIN role r
             ON r.id = e.role_id
             LEFT JOIN department d
             ON d.id = r.department_id
             LEFT JOIN employee m
             ON m.id = e.manager_id
             ORDER by e.id`, (err, results) => {
            if (err) throw (err);
            console.log('\n');
            console.table(results);
        });
        menu();
    };

    function viewAllRoles() {
        connection.query(
            `SELECT r.id AS "Id",
                r.title AS "Title",
                r.salary AS "Salary",
                d.name AS "Department"
            FROM role r
            LEFT JOIN department d
            ON d.id = r.department_id
            `, (err, results) => {
            if (err) throw (err);
            console.log('\n');
            console.table(results);
        });
        menu();
    };

    // Get Corporate Data Functions

    function getRoles() {
        connection.query(
            `SELECT r.title
            FROM role r
            `, (err, results) => {
            if (err) throw (err);
            // Store all returned rows in a var
            const objectifyRawPacket = row => ({ ...row });
            // Iterate through each row to convert from raw packet -> js object
            const convertedResults = results.map(objectifyRawPacket);
            // Iterate through once more to format data for inquirer.js
            const trimResults = [];
            convertedResults.forEach(item => {
                trimResults.push(item.title);
            });
            let roles = JSON.stringify(trimResults);
            // Export out all possible selections for user
            module.exports = roles;
            console.log(roles);
            console.log(typeof roles);
            return
        });
    };

    // Add Corporate Data Functions

    function addNewEmployee() {
        getRoles();
        inquirer.prompt(newEmployeeSurvey).then(answers => {
            console.log("success");
            //     // connection.query(
            //     //     `SELECT r.id AS "Id",
            //     //         r.title AS "Title",
            //     //         r.salary AS "Salary",
            //     //         d.name AS "Department"
            //     //     FROM role r
            //     //     LEFT JOIN department d
            //     //     ON d.id = r.department_id
            //     //     `, (err, results) => {
            //     //     if (err) throw (err);
            //     //     console.log('\n');
            //     //     console.table(results);
        });
        // menu();
    };

    // function quitProgram() {
    //     connectSQL.end();
    //     process.exit();
    // }
};