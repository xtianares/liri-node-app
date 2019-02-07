require("dotenv").config();

let keys = require("./keys.js"),
    Spotify = require('node-spotify-api'),
    spotify = new Spotify(keys.spotify),
    axios = require("axios"),
    moment = require("moment"),
    inquirer = require('inquirer'), // will use this it ask for user input
    fs = require('fs'); // will use this o log user input history to a file

// main function to determine what he user is asking for
const runCommand = (userCommand, commandInfo) => {
    switch (userCommand){
        // if user is looking for concert dates
        case 'concert-this':
            // console.log(userCommand);
            // console.log(commandInfo);
            concertThis(commandInfo);
            break;
        case 'spotify-this-song':
            // console.log(userCommand);
            // console.log(commandInfo);
            spotifyThis(commandInfo);
            break;
        case 'movie-this':
            // console.log(userCommand);
            // console.log(commandInfo);
            movieThis(commandInfo);
            break;
        case 'do-what-it-says':
            // console.log(userCommand);
            // console.log(commandInfo);
            doThis(commandInfo);
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
                let {venue, datetime} = events[0];
                // Name of the venue
                console.log('Venue: ' + venue.name);
                // console.log("The movie's rating is: " + response.data.imdbRating);
                // Venue location
                console.log('Location: ' + venue.city + ', ' + venue.country);
                // Date of the Event (use moment to format this as "MM/DD/YYYY")
                console.log('Date: ' + moment(events[0].datetime).format("MM/DD/YYYY"));
                // adding line
                console.log('---------------------');
            }
        }
    );
}
const spotifyThis = song => {
    let query = song != "" ? song : "The Sign";
    // note: seems like that the API cant find the song "The Sign"
    spotify.search({ type: 'track', query: query, limit: 1 })
        .then(function(response) {
            let {artists, name, preview_url, album} = response.tracks.items[0];
            console.log("Artist: " + artists[0].name);
            console.log("Song Title: " + name);
            console.log("Preview: " + preview_url);
            console.log("Album: " + album.name);
        })
        .catch(function(err) {
            console.log(err);
    });
}
const movieThis = movie => {
    let query = movie != "" ? movie : "Mr. Nobody";
    let queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            // console.log(response.data);
            let {Title, Year, Ratings, Country, Language, Plot, Actors} = response.data;
            console.log("Movie Title: " + Title);
            console.log("Year Released:  " + Year);
            console.log("IMDB Rating:  " + Ratings[0].Value);
            console.log("Rotten Tomatoes Rating:  " + Ratings[1].Value);
            console.log("Country:  " + Country);
            console.log("Movie Language:  " + Language);
            console.log("Plot:  " + Plot);
            console.log("Actors:  " + Actors);
        }
    );
}
const doThis = () => {
    fs.readFile("random.txt", "utf8", function(err, data){
        // console.log(data);
        let info = data.split(", ");
        // console.log(info);
        runCommand(info[0], info[1]);
    });
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
    let userInput = response.command.split(' '),
        userCommand = userInput.shift(),
        commandInfo = userInput.join('+');
        
    runCommand(userCommand, commandInfo);
    // console.log(userCommand);
    // console.log(commandInfo);
});
