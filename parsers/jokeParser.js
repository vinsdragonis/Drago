const Memer = require("random-jokes-api");

const getJoke = () => {
    let jokes = Memer.joke();
    return jokes;
}

const getPun = () => {
    let pun = Memer.pun();
    return pun;
}

const getQuote = () => {
    let quote = Memer.quotes();
    return quote;
}

module.exports = {getJoke, getPun, getQuote};