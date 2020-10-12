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
        console.log(data + "\nContoso  Corp. Content Managment System");
    };
});

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
    console.log("\nConnected to MySQL database using thread: " + connectSQL.threadId)
    init();
});

//  App Start
function init() {

    // Bring in all inquirer prompt questions
    const questions = require('./lib/questions');

    // node inquirer package collects user response, generates output
    getInfo();

    function getInfo() {
        inquirer.prompt(menuOperator).then(answers => {
            // check to see if we need to go back
            if (answers.hasMore !== false) {
                // function(answers);
                getInfo();
            }
            else {
                // function(answers);
                // function(answers);
            };
        });
    };
} ''