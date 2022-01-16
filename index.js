const greetings = require('./messages/greetings');
const dateAndTime = require('./messages/dateAndTime');
const jokesAndPuns = require('./messages/jokesAndPuns');
require('dotenv').config();

const { Client, Intents, Permissions } = require('discord.js');
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
        for(res in greetings[msg].received) {
            if (message.content.toLowerCase() === greetings[msg].received[res].toLowerCase()) {
                message.channel.send(`${greetings[msg].reply}, ${message.author.username}!`);
            }
        }
    }

    // DATE AND TIME
    for (msg in dateAndTime) {
        for (res in dateAndTime[msg].received) {
            if (message.content.toLowerCase() === dateAndTime[msg].received[res].toLowerCase()) {
                message.channel.send(`${dateAndTime[msg].reply}`);
            }
        }
    }

    // DAD JOKES
    for (msg in jokesAndPuns) {
        for (res in jokesAndPuns[msg].received) {
            if (message.content.toLowerCase() === jokesAndPuns[msg].received[res].toLowerCase()) {
                message.channel.send(`${jokesAndPuns[msg].reply}`);
            }
        }
    }

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        
        if (CMD_NAME === 'kick') {
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
                return message.reply('I do not have permissions to use that command :(');
            
            if (args.length === 0) message.reply('Please provide an ID.');
            
            const member = message.guild.members.cache.get(args[0]);
            
            if (member) {
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked.`))
                    .catch((err) => message.channel.send("I can't kick that user :("));
            } else {
                message.channel.send("I couldn't find that dude.");
            }
        } else if (CMD_NAME === 'ban') {
            if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
                return message.reply('I do not have permissions to use that command :(');
            
            if (args.length === 0) message.reply('Please provide an ID.');

            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send(`${user} was banned successfully`);
            } catch (err) {
                // console.log(err);
                message.channel.send('An error occured. Either I do not have permissions or the user was not found');
            }
        }
    }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);