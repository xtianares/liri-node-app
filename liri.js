require("dotenv").config();

let keys = require("./keys.js"),
    Spotify = require('node-spotify-api'),
    spotify = new Spotify(keys.spotify),
    axios = require("axios"),
    moment = require("moment"),
    inquirer = require('inquirer'), // will use this it ask for user input
    fs = require('fs'); // will use this o log user input history to a file

let userCommand = "",
    commandInfo = "";

// main function to determine what he user is asking for
const runCommand = (userCommand, commandInfo) => {
    switch (userCommand){
        // if user is looking for concert dates
        case 'concert-this':
            // console.log(userCommand);
            // console.log(commandInfo);
            concertThis(commandInfo);
            break;
        default:
            console.log("I don't know what you mean by that, please check the documentation.");
            break;
    }
}

const concertThis = artist => {
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            let events = response.data;
            for (let i = 0; i < events.length; i++) {
                // Name of the venue
                console.log(events[0].venue.name);
                // console.log("The movie's rating is: " + response.data.imdbRating);
                // Venue location
                console.log(events[0].venue.city + ', ' + events[0].venue.country);
                // Date of the Event (use moment to format this as "MM/DD/YYYY")
                console.log(moment(events[0].datetime).format("MM/DD/YYYY"));
                // adding line
                console.log('---------------------');
            }
        }
    );
}

// Prompt the user to provide command
inquirer.prompt([
    {
        type: "input",
        name: "command",
        message: "Hi there I'm LIRI, what can I do for you?"
    }
])
.then(function(response) {
    // console.log(response.command);

    let userInput = response.command.split(' ');
    userCommand = userInput.shift();
    commandInfo = userInput.join('+');

    runCommand(userCommand, commandInfo);

    // console.log(userCommand);
    // console.log(commandInfo);
});
