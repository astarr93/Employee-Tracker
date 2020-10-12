const figlet = require("figlet");

// ASCII Art to Start Program
figlet("Employee Management System", function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    };
    // Run app
    init();
});

//  App Start
function init() {

    const questions = require('./lib/questions');

    // node inquirer package collects user response, generates output
    getInfo();

    function getInfo() {
        inquirer.prompt(questions).then(answers => {
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