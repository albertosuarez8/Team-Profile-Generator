const Manager = require('./lib/manager');
const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');
var inquirer = require("inquirer");
var internList = [];
var engineerList = [];
var teamManagerObj = {};

var teamManager = [
    {
        type: "input",
        name: "teamManagerName",
        message: "Team Manager Name:"
    },
    {
        type: "input",
        name: "teamManagerId",
        message: "Team Manager Employee ID:"
    },
    {
        type: "input",
        name: "teamManagerEmail",
        message: "Team Manager Email:"
    },
    {
        type: "input",
        name: "teamManagerOfficeNumber",
        message: "Team Manager Office Number:"
    }
]

var addToTeam = {
    type: "list",
    name: "mainChoice",
    message: "Intern, Engineer, or Finished Building Team?",
    choices: [
        "Intern",
        "Engineer",
        "Finished Building Team"
    ],
    default: "Finished Building Team",
    loop: true
}

var intern = [
    {
        type: "input",
        name: "internName",
        message: "Intern Name:"
    },
    {
        type: "input",
        name: "internId",
        message: "Intern ID:"
    },
    {
        type: "input",
        name: "internEmail",
        message: "Intern Email:"
    },
    {
        type: "input",
        name: "internSchool",
        message: "Intern School:"
    }
]

var engineer = [
    {
        type: "input",
        name: "engineerName",
        message: "Engineer Name:"
    },
    {
        type: "input",
        name: "engineerId",
        message: "Engineer ID:"
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "Engineer Email:"
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "Engineer Github Username:"
    }
]

function init() {
    inquirer
        .prompt(teamManager)
        .then((answers) => {
            teamManagerObj = new Manager(answers.teamManagerName, answers.teamManagerId, answers.teamManagerEmail, answers.teamManagerOfficeNumber)
            addTeamMember();
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Could not be rendered in current environment")
            } else {
                console.log(error)
            }
        })
}

function addTeamMember() {
    inquirer
        .prompt(addToTeam)
        .then((answers) => {
            if (answers.mainChoice == "Intern") {
                internQuestions();
            }
            if (answers.mainChoice == "Engineer") {
                engineerQuestions();
            }
            console.log(internList);
            console.log(engineerList);
            console.log(teamManagerObj);
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Could not be rendered in current environment")
            } else {
                console.log(error)
            }
        })
}

function internQuestions() {
    inquirer
        .prompt(intern)
        .then((answers) => {
            internList.push(new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool));
            addTeamMember();
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Could not be rendered in current environment")
            } else {
                console.log(error)
            }
        })
}

function engineerQuestions() {
    inquirer
        .prompt(engineer)
        .then((answers) => {
            engineerList.push(new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub));
            addTeamMember();
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Could not be rendered in current environment")
            } else {
                console.log(error)
            }
        })
}

init();