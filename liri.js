require("dotenv").config();

let keys = require("./keys.js"),
    Spotify = require('node-spotify-api'),
    spotify = new Spotify(keys.spotify)
    inquirer = require('inquirer'), // will use this it ask for user input
    fs = require('fs'); // will use this o log user input history to a file

let userCommand = "",
    commandInfo = "";

// Prompt the user to provide command.
inquirer.prompt([
    {
        type: "input",
        name: "userInput",
        message: "Hi there I'm LIRI, what can I help you with?"
    }
])
.then(function(response) {
    console.log(response.userInput);
    let userInput = response.userInput.split(' ');
    userCommand = userInput.shift();
    commandInfo = userInput.join(' ');

    console.log(userCommand);
    console.log(commandInfo);
});
