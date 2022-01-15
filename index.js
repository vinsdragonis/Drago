const greetings = require('./messages/greetings');
const date = require('./messages/date');
const time = require('./messages/time');
const day = require('./messages/day');
const formatDate = require('./parsers/dateParser');
const formatDay = require('./parsers/dayParser');
const getTime = require('./parsers/timeParser');
require('dotenv').config();

const { Client, Intents } = require('discord.js');

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE', 'REACTION']
});

bot.on('ready', () => {
    console.log(`${bot.user.tag} has logged in`);
});

bot.on('messageCreate', async (message) => {
    // console.log(`${message.author.username} says "${message.content}"`);

    if (message.author.bot) return;
    
    for (msg in greetings) {
        if (message.content.toLowerCase() === greetings[msg].recived.toLowerCase()) {
            message.channel.send(`${greetings[msg].recived}, ${message.author.username}!`);
        }
    }

    for (msg in date) {
        if (message.content.toLowerCase() === date[msg].recived.toLowerCase()) {
            message.channel.send(`${formatDate(new Date())}`);
        }
    }

    for (msg in time) {
        if (message.content.toLowerCase() === time[msg].recived.toLowerCase()) {
            message.channel.send(`${getTime()}`);
        }
    }
    
    for (msg in day) {
        if (message.content.toLowerCase() === day[msg].recived.toLowerCase()) {
            message.channel.send(`${formatDay()}`);
        }
    }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);