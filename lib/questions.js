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
    when: (answers) => answers.menu === "Get corporate data"
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

module.exports = {
    "menuOperator": menuOperator,
}