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

    // Promise for async functions 
    function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 2000);
        });
    };

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

    menu();

    // Main UX
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
                    addNewDepartment();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new employee')):
                    addNewEmployee();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new role')):
                    addNewRole();
                    break;
                case ((answers.menu === 'Update corporate data') && (answers.menuUpdate === 'Update employee manager')):
                    console.log("Feature Coming Soon!");
                    // UpdateEmployeeManager();
                    menu();
                    break;
                case ((answers.menu === 'Update corporate data') && (answers.menuUpdate === 'Update employee role')):
                    UpdateEmployeeRole();
                    break;
                case ((answers.menu === 'Delete corporate data') && (answers.menuDelete === 'DELETE employee manager')):
                    console.log("Feature Coming Soon!");
                    // deleteEmployeeManager();
                    menu();
                    break;
                case ((answers.menu === 'Delete corporate data') && (answers.menuDelete === 'DELETE employee role')):
                    console.log("Feature Coming Soon!");
                    // deleteEmployeeRole();
                    menu();
                    break;
            };
        });
    };

    // Supporting functions
    // Get corporate data functions
    const getDepartments = async () => {
        let result = [];
        const query = "SELECT d.id, d.name FROM department d ORDER BY d.id";
        connection.query(query, (err, results) => {
            if (err) throw (err);
            // Store all returned rows in a var
            const objectifyRawPacket = row => ({ ...row });
            // Iterate through each row to convert from raw packet -> js object
            const convertedResults = results.map(objectifyRawPacket);
            result = Array.from(convertedResults);
            return result;
        });
        // Call Promise to allow connection.query above to finish
        let wait = await resolveAfter2Seconds();
        return result;
    };

    const getEmployees = async () => {
        let result = [];
        const query = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS "Name" FROM employee e ORDER BY e.id`;
        connection.query(query, (err, results) => {
            if (err) throw (err);
            // Store all returned rows in a var
            const objectifyRawPacket = row => ({ ...row });
            // Iterate through each row to convert from raw packet -> js object
            const convertedResults = results.map(objectifyRawPacket);
            result = Array.from(convertedResults);
            return result;
        });
        // Call Promise to allow connection.query above to finish
        let wait = await resolveAfter2Seconds();
        return result;
    };

    const getRoles = async () => {
        let result = [];
        const query = "SELECT r.id, r.title FROM role r ORDER BY r.id";
        connection.query(query, (err, results) => {
            if (err) throw (err);
            // Store all returned rows in a var
            const objectifyRawPacket = row => ({ ...row });
            // Iterate through each row to convert from raw packet -> js object
            const convertedResults = results.map(objectifyRawPacket);
            result = Array.from(convertedResults);
            return result;
        });
        // Call Promise to allow connection.query above to finish
        const wait = await resolveAfter2Seconds();
        return result;
    };

    // View corporate data functions
    function viewAllDepartments() {
        const query = "SELECT id AS 'Id', name AS 'Name' FROM department";
        connection.query(query, (err, results) => {
            if (err) throw (err);
            console.log("\n\n");
            console.table(results);
            console.log("\n\n\n\n");
            connection.end();
        });
        menu();
    };

    function viewAllEmployees() {
        const query = "SELECT e.id AS 'Id', CONCAT(e.first_name, ' ', e.last_name) AS 'Name', r.title AS 'Title', d.name AS 'Department', r.salary AS 'Salary', CONCAT(m.first_name, ' ', m.last_name) AS 'Manager' FROM employee e LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id ORDER BY e.id";
        connection.query(query, (err, results) => {
            if (err) throw (err);
            console.log("\n\n");
            console.table(results);
            console.log("\n\n\n\n\n");
            connection.end();
        });
        menu();
    };

    function viewAllRoles() {
        const query = "SELECT r.id AS 'Id', r.title AS 'Title', r.salary AS 'Salary', d.name AS 'Department' FROM role r LEFT JOIN department d ON d.id = r.department_id";
        connection.query(query, (err, results) => {
            if (err) throw (err);
            console.log("\n\n");
            console.table(results);
            console.log("\n\n\n\n\n");
            connection.end();
        });
        menu();
    };


    // Add corporate data functions
    async function addNewDepartment() {

        // // Prompt for answers to create new employee
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the new department?",
            }
        ]).then(answers => {
            const query = "INSERT INTO department SET ?";
            connection.query(query, { name: answers.name }, (err, results) => {
                if (err) throw (err);
                console.log(`\n\n${answers.name} has been successfully added to the database.\n\n`);
                connection.end();
            });
            menu();
        });
    };

    async function addNewEmployee() {

        // Get data to prepare inquirer.js and conversions
        const roles = await getRoles().then((result) => {
            // Iterate through once more to format data for inquirer.js
            const trimResults = [];
            result.forEach(item => {
                trimResults.push(item.title);
            });
            // Create Array from trimResults to make list possible role choices
            return Array.from(Object.values(trimResults));
        });
        const rolesObj = await getRoles();
        const employees = await getEmployees().then((result) => {
            // Iterate through once more to format data for inquirer.js
            const trimResults = [];
            result.forEach(item => {
                trimResults.push(item.Name);
            });
            // Create Array from trimResults to make list possible role choices
            return Array.from(Object.values(trimResults));
        });
        const employeesObj = await getEmployees();

        // Prompt for answers to create new employee
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the new employee's first name?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the new employee's last name?",
            },
            {
                type: "rawlist",
                name: "role",
                message: "What is the new employee's title?",
                choices: roles,
            },
            {
                type: "rawlist",
                name: "manager",
                message: "Who is the new employee's direct manager?",
                choices: employees,
            }
        ]).then(answers => {
            // Prep MySQL INSERT by converting user selection to match schema
            rolesObj.forEach(entry => {
                if (entry.title === answers.role) {
                    answers.role = entry.id;
                };
            });
            employeesObj.forEach(entry => {
                if (entry.Name === answers.manager) {
                    answers.manager = entry.id;
                };
            });
            const query = "INSERT INTO employee SET ?";
            connection.query(query, { first_name: answers.first_name, last_name: answers.last_name, role_id: answers.role, manager_id: answers.manager }, (err, results) => {
                if (err) throw (err);
                console.log(`\n\n${answers.first_name} ${answers.last_name} has been successfully added to the database.\n\n`);
                connection.end();
            });
            menu();
        });
    };

    async function addNewRole() {

        // Get data to prepare inquirer.js and conversions
        const departments = await getDepartments().then((result) => {
            // Iterate through once more to format data for inquirer.js
            const trimResults = [];
            result.forEach(item => {
                trimResults.push(item.name);
            });
            // Create Array from trimResults to make list possible role choices
            return Array.from(Object.values(trimResults));
            // Clone Array to function root scope for data pass back
        });
        const departmentsObj = await getDepartments();
        const wait = await resolveAfter2Seconds();

        // // Prompt for answers to create new employee
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the new role?",
            },
            {
                type: "number",
                name: "salary",
                message: "What is the approved salary?",
            },
            {
                type: "rawlist",
                name: "department",
                message: "What department should the new role belong to?",
                choices: departments,
            },
        ]).then(answers => {
            // Prep MySQL INSERT by converting user selection to match schema
            // if (answers.salary === NaN || answers.salary.length >= 10) {
            //     console.log("ERROR: You either entered value for salary that is not a number or is greater than 10 digits. Please restart...");
            //     terminate();
            // };
            departmentsObj.forEach(entry => {
                if (entry.name === answers.department) {
                    answers.department = entry.id;
                };
            });
            const query = "INSERT INTO role SET ?";
            connection.query(query, { title: answers.title, salary: answers.salary, department_id: answers.department }, (err, results) => {
                if (err) throw (err);
                console.log(`\n\n${answers.role} has been successfully added to the database.\n\n`);
                connection.end();
            });
            menu();
        });
    };



    // Update corporate data functions
    async function UpdateEmployeeManager() {

    };

    async function UpdateEmployeeRole() {
        // Get data to prepare inquirer.js and conversions
        const roles = await getRoles().then((result) => {
            // Iterate through once more to format data for inquirer.js
            const trimResults = [];
            result.forEach(item => {
                trimResults.push(item.title);
            });
            // Create Array from trimResults to make list possible role choices
            return Array.from(Object.values(trimResults));
        });
        const rolesObj = await getRoles();
        const employees = await getEmployees().then((result) => {
            // Iterate through once more to format data for inquirer.js
            const trimResults = [];
            result.forEach(item => {
                trimResults.push(item.Name);
            });
            // Create Array from trimResults to make list possible role choices
            return Array.from(Object.values(trimResults));
        });
        const employeesObj = await getEmployees();

        // Prompt for answers to create new employee
        inquirer.prompt([
            {
                type: "rawlist",
                name: "person",
                message: "Which employee's role do you wish to update?",
                choices: employees,
            }
            {
                type: "rawlist",
                name: "role",
                message: "What is the employee's new title?",
                choices: roles,
            },
        ]).then(answers => {
            // Prep MySQL INSERT by converting user selection to match schema
            rolesObj.forEach(entry => {
                if (entry.title === answers.role) {
                    answers.role = entry.id;
                };
            });
            employeesObj.forEach(entry => {
                if (entry.Name === answers.manager) {
                    answers.manager = entry.id;
                };
            });
            const query = "INSERT INTO employee SET ?";
            connection.query(query, { first_name: answers.first_name, last_name: answers.last_name, role_id: answers.role, manager_id: answers.manager }, (err, results) => {
                if (err) throw (err);
                console.log(`\n\n${answers.first_name} ${answers.last_name} has been successfully added to the database.\n\n`);
                connection.end();
            });
            menu();
        });
    };
};

    // function terminate() {
    //     connection.end();
    //     process.exit();
    // };
};