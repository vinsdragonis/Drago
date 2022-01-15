const Memer = require("random-jokes-api");

const getJoke = () => {
    let jokes = Memer.joke();
    return jokes;
}

module.exports = getJoke;