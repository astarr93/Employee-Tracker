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
// function init() {

// }''