const formatDate = require('../parsers/dateParser');
const formatDay = require('../parsers/dayParser');
const getTime = require('../parsers/timeParser');

const time = [
    {
        id: 1,
        received: [
            "What is the time?",
            "Tell me the time",
            "What is the time",
            "time?",
        ],
        reply: getTime(),
    },
    {
        id: 2,
        received: [
            "What is the date?",
            "Tell me the date",
            "What is the date",
            "date?",
        ],
        reply: formatDate(new Date()),
    },
    {
        id: 3,
        received: [
            "What is the day?",
            "Tell me the day",
            "day?",
        ],
        reply: formatDay(),
    },
];

module.exports = time;