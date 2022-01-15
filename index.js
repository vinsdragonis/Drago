const greetings = require('./messages/greetings');
const dateAndTime = require('./messages/dateAndTime');
const joke = require('./messages/joke');
const pun = require('./messages/pun');
const quote = require('./messages/quote');
const { getJoke, getPun, getQuote } = require('./parsers/jokeParser');
require('dotenv').config();

const { Client, Intents } = require('discord.js');
const PREFIX = "$";

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE', 'REACTION']
});

bot.on('ready', () => {
    console.log(`${bot.user.username} has logged in`);
});

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // GREETINGS
    for (msg in greetings) {
        for(res in greetings[msg].received){
            if (message.content.toLowerCase() === greetings[msg].received[res].toLowerCase()) {
                message.channel.send(`${greetings[msg].reply}, ${message.author.username}!`);
            }
        }
    }

    // DATE AND TIME
    for (msg in dateAndTime) {
        for (res in dateAndTime[msg].received){
            if (message.content.toLowerCase() === dateAndTime[msg].received[res].toLowerCase()) {
                message.channel.send(`${dateAndTime[msg].reply}`);
            }
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

    if (message.content.startsWith(PREFIX)) {
        const CMD_NAME = message.content.substring(PREFIX.length);
        console.log(CMD_NAME);
    }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);