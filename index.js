const figlet = require("figlet");
const mysql = require('mysql');
const inquirer = require('inquirer');
const { menuOperator } = require("./lib/questions");

// ASCII Art to Start Program
figlet("Contoso CMS\n", function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data + "\nContoso Corp. Content Managment System");
    };
    connectSQL();
});

function connectSQL() {

    // Setup local SQL database connection
    const connectSQL = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "QiCpT@n#vD5w6U0LPDl0",
        database: "company_db"
    });

    // Connect to SQL DB
    connectSQL.connect((err) => {
        if (err) throw err;
        console.log(`\nConnected to Contoso Corp. MySQL database using thread: ${connectSQL.threadId}\n`);
        init();
    });

};

//  App Start
function init() {

    // Bring in all inquirer prompt questions
    const questions = require('./lib/questions');

    // node inquirer package collects user response, generates output
    getInfo();

    function getInfo() {
        inquirer.prompt(menuOperator).then(answers => {
            // check to see if we need to go back
            switch (true) {
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all departments')):
                    console.log(1);
                    getAllDepartments();
                    break;
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all employees')):
                    console.log(2);
                    getAllEmployees();
                    break;
                case ((answers.menu === 'View corporate data') && (answers.menuGet === 'View all roles')):
                    console.log(3);
                    getAllRoles();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new department')):
                    console.log(4);
                    addNewDepartment();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new employee')):
                    console.log(5);
                    addNewEmployee();
                    break;
                case ((answers.menu === 'Add corporate data') && (answers.menuAdd === 'Add new role')):
                    console.log(6);
                    addNewRole();
                    break;
                case ((answers.menu === 'Update corporate data') && (answers.menuUpdate === 'Update employee manager')):
                    console.log(7);
                    UpdateEmployeeManager();
                    break;
                case ((answers.menu === 'Update corporate data') && (answers.menuUpdate === 'Update employee role')):
                    console.log(8);
                    UpdateEmployeeRole();
                    break;
                case ((answers.menu === 'Delete corporate data') && (answers.menuDelete === 'DELETE employee manager')):
                    console.log(10);
                    deleteEmployeeManager();
                    break;
                case ((answers.menu === 'Delete corporate data') && (answers.menuDelete === 'DELETE employee role')):
                    console.log(11);
                    deleteEmployeeRole();
                    break;
            };
        });
    };
};