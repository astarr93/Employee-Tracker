const menuOperator = [{
    type: "list",
    name: "menu",
    message: "Please choose an operation:",
    choices: ["View corporate data", "Add corporate data", "Update corporate data", "Delete corporate data"]
},
{
    type: "list",
    name: "menuGet",
    message: "Please select from one of the available view options:",
    choices: ["View all departments", "View all employees", "View all roles"],
    when: (answers) => answers.menu === "View corporate data"
},
{
    type: "list",
    name: "menuAdd",
    message: "Please select from one of the available options to add:",
    choices: ["Add new department", "Add new employee", "Add new role"],
    when: (answers) => answers.menu === "Add corporate data"
},
{
    type: "list",
    name: "menuUpdate",
    message: "Please select from one of the available options to update:",
    choices: ["Update employee manager", "Update employee role"],
    when: (answers) => answers.menu === "Update corporate data"
},
{
    type: "list",
    name: "menuDelete",
    message: "Please select from one of the available options to DELETE:",
    choices: ["DELETE employee manager", "DELETE employee role"],
    when: (answers) => answers.menu === "Delete corporate data"
}
];


const roles = require('../index');

const availableRoles = checkRoles();

function checkRoles() {
    let test = [];
    Array.from(roles).forEach(role => {
        test.push(role);
        console.log(role);
    });
    return test;
};



// console.log(test);

const newEmployeeSurvey = [
    {
        type: "input",
        name: "first_name",
        message: "What is the employees first name?",
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employees last name?",
    },
    {
        type: "list",
        name: "role",
        message: "Did it work?",
        choices: `${availableRoles}`,
    },
    // {
    //     type: "list",
    //     name: "manager",
    //     message: "Who is the employees manager?",

    // }
];

module.exports = {
    "menuOperator": menuOperator,
    "newEmployeeSurvey": newEmployeeSurvey,
};