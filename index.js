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
    
    // Create connection to mysql database
    function connectSQL() {
        
        // Setup local SQL database connection
        dotenv.config();
        const connectSQL = mysql.createConnection({
            host: process.env.host,
            port: process.env.port,
            user: process.env.user,
            password: process.env.password,
            database: process.env.db
        });

        // Connect to SQL DB
        connectSQL.connect((err) => {
            if (err) throw err;
        });

    };
    console.log(process.env.password);

    // Node.js pkg inquirer collects user response to generate output
    getInfo();

    function getInfo() {
        inquirer.prompt(menuOperator).then(answers => {
            connectSQL();
            switch (true) {
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all departments')):
                    console.log(1);
                    getAllDepartments();
                    break;
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all employees')):
                    console.log(2);
                    // getAllEmployees();
                    break;
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all roles')):
                    console.log(3);
                    // getAllRoles();
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
        connectSQL.query('SELECT * FROM department', (err, results) => {
            if (err) throw (err);
            console.table(results);
            // quitProgram();
            getInfo();
        });
    };

    // function getAllEmployees() {

    // };

    // function getAllRoles() {

    // };

    function quitProgram() {
        connectSQL.end();
        process.exit();
    }
};