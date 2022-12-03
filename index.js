const Manager = require('./lib/manager');
const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');
var inquirer = require("inquirer");
const fs = require("fs");
var internList = [];
var engineerList = [];
var teamManagerObj = {};

var topHTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Portfolio Generator</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<body class="w-100 h-100">
<header class="d-flex justify-content-center align-items-center w-100" style="background-color:cadetblue; height: 150px;">
    <h1>My Team</h1>
  </header>
  <div class="d-flex flex-wrap justify-content-center">`;

var bottomHTML = `</div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"></script>
</body>
</html>`;


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
                return;
            }
            if (answers.mainChoice == "Engineer") {
                engineerQuestions();
                return;
            }
            let cards = [makeCard(teamManagerObj)];
            engineerList.forEach(x => {
                cards.push(makeCard(x));
            })
            internList.forEach(x => {
                cards.push(makeCard(x));
            });
            generatesHTML(cards);
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

function makeCard(obj) {
    let temp = "";
    if (typeof obj.getGithub === "function") {
        temp = `<a class="d-flex justify-content-center card-link text-light text-decoration-none fs-5" style="margin: 10px 0; overflow-wrap: anywhere;" href="https://www.github.com/${obj.getGithub()}">Github: ${obj.getGithub()}</a>`
    }
    if (typeof obj.getSchool === "function") {
        temp = `<p class="d-flex justify-content-center card-text fs-5" style="margin: 10px 0; overflow-wrap: anywhere;">School: ${obj.getSchool()}</p>`
    }
    if (typeof obj.getOfficeNumber === "function") {
        temp = `<p class="d-flex justify-content-center card-text fs-5" style="margin: 10px 0; overflow-wrap: anywhere;">Office Number: ${obj.getOfficeNumber()}</p>`
    }
    let card = `
    <div class="d-flex justify-content-center align-items-center card text-bg-info" style="width: 18rem; margin: 35px 35px;">
      <div class="card-body">
        <p class="d-flex justify-content-center card-text fs-2" style="overflow-wrap: anywhere;">${obj.getName()}</p>
        <p class="d-flex justify-content-center card-text border-bottom border-primary fs-2" style="overflow-wrap: anywhere;">${obj.getRole()}</p>
        <p class="d-flex justify-content-center card-text fs-5" style="overflow-wrap: anywhere;">Id: ${obj.getId()}</p>
        <a class="d-flex justify-content-center card-link text-light text-wrap text-decoration-none fs-5" style="overflow-wrap: anywhere;"
          href="mailto:${obj.getEmail()}">Email: ${obj.getEmail()}</a>
          ${temp}
      </div>
    </div>`;
    return card;
}

function generatesHTML(cards) {
    let html = topHTML + cards.join().replaceAll(',', '') + bottomHTML;
    fs.writeFileSync(`./dist/index.html`, html);
}

init();