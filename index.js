const greetings = require('./messages/greetings');
const date = require('./messages/date');
const time = require('./messages/time');
const day = require('./messages/day');
const joke = require('./messages/joke');
const pun = require('./messages/pun');
const quote = require('./messages/quote');
const formatDate = require('./parsers/dateParser');
const formatDay = require('./parsers/dayParser');
const getTime = require('./parsers/timeParser');
const { getJoke, getPun, getQuote } = require('./parsers/jokeParser');
require('dotenv').config();

const { Client, Intents } = require('discord.js');

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE', 'REACTION']
});

bot.on('ready', () => {
    console.log(`${bot.user.username} has logged in`);
});

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    for (msg in greetings) {
        for(res in greetings[msg].received){
            if (message.content.toLowerCase() === greetings[msg].received[res].toLowerCase()) {
                message.channel.send(`${greetings[msg].reply}, ${message.author.username}!`);
            }
        }
    }

    for (msg in date) {
        if (message.content.toLowerCase() === date[msg].received.toLowerCase()) {
            message.channel.send(`${formatDate(new Date())}`);
        }
    }

    for (msg in time) {
        if (message.content.toLowerCase() === time[msg].received.toLowerCase()) {
            message.channel.send(`${getTime()}`);
        }
    }
    
    for (msg in day) {
        if (message.content.toLowerCase() === day[msg].received.toLowerCase()) {
            message.channel.send(`${formatDay()}`);
        }
    }

    for (msg in joke) {
        if (message.content.toLowerCase() === joke[msg].received.toLowerCase()) {
            message.channel.send(`${getJoke()}`);
        }
    }

    for (msg in pun) {
        if (message.content.toLowerCase() === pun[msg].received.toLowerCase()) {
            message.channel.send(`${getPun()}`);
        }
    }

    for (msg in quote) {
        if (message.content.toLowerCase() === quote[msg].received.toLowerCase()) {
            message.channel.send(`${getQuote()}`);
        }
    }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);