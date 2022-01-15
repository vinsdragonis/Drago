const greetings = require('./messages/greetings');
const date = require('./messages/date');
const time = require('./messages/time');
const formatDate = require('./parsers/dateParser');
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

bot.on('messageCreate', (message) => {
    // console.log(`${message.author.username} says "${message.content}"`);
    
    for (msg in greetings) {
        if (message.content.toLowerCase() === greetings[msg].recived.toLowerCase()) {
            message.reply(`Hi there, ${message.author.username}!`);
        }
    }

    for (msg in date) {
        if (message.content.toLowerCase() === date[msg].recived.toLowerCase()) {
            message.reply(`${formatDate(new Date())}`);
        }
    }

    for (msg in time) {
        if (message.content.toLowerCase() === time[msg].recived.toLowerCase()) {
            message.reply(`${getTime()}`);
        }
    }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);