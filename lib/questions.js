const questions = [{
    type: "list",
    name: "menu",
    message: "What is the employee's name?: "
},
{
    type: "input",
    name: "id",
    message: "What is the employee's personnel identification number: "
},
{
    type: "input",
    name: "email",
    message: "What is the employee's email address?: "
},
{
    type: "list",
    name: "role",
    message: "What would you say they do here?: ",
    choices: ["Engineer", "Intern", "Manager"]
},
{
    type: "input",
    name: "github",
    message: "What is the Engineer's github username?: ",
    when: (answers) => answers.role === "Engineer"
},
{
    type: "input",
    name: "school",
    message: "What university is the employee currently enrolled at?: ",
    when: (answers) => answers.role === "Intern"
},
{
    type: "input",
    name: "officeNumber",
    message: "What is the employee's office number?: ",
    when: (answers) => answers.role === "Manager"
},
{
    type: "confirm",
    name: "hasMore",
    message: "Do you want to add another team member?: ",
},
];

module.exports = questions;