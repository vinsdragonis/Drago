const { getJoke, getPun, getQuote } = require('../parsers/jokeParser');

const jokes = [
    {
        id: 1,
        received: [
            "I'm bored",
            "Tell me a joke",
            "Narrate a joke",
            "I am bored",
            "joke",
        ],
        reply: getJoke(),
    },
    {
        id: 2,
        received: [
            "Tell me a pun",
            "Narrate a pun",
            "Got any puns?",
            "pun",
        ],
        reply: getPun(),
    },
    {
        id: 3,
        received: [
            "Inspire me",
            "Tell me something inspirational",
            "Narrate a quote",
            "Any quotes?",
            "quote",
        ],
        reply: getQuote(),
    },
];

module.exports = jokes;