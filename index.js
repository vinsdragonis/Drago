const greetings = require('./greetings');
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
    console.log(`${message.author.username} says "${message.content}"`);
    
    for (msg in greetings) {
        if (message.content === greetings[msg].recived) {
            message.reply(`Hi there, ${message.author.username}!`);
        }
    }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);