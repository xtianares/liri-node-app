require("dotenv").config();

let keys = require("./keys.js"),
    spotify = new Spotify(keys.spotify);
