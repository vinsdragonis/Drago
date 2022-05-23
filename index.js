const greetings = require('./messages/greetings');
const dateAndTime = require('./messages/dateAndTime');
const jokesAndPuns = require('./messages/jokesAndPuns');
require('dotenv').config();

const { Client, Intents, Permissions, MessageEmbed } = require('discord.js');
const PREFIX = "$";

const bot = new Client(
    {intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]},
    {partials: ['MESSAGE', 'REACTION']},
);

bot.on('ready', () => {
    console.log(`${bot.user.username} has logged in`);
});

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // GREETINGS
    if (greetings.some(x => x.received.includes(message.content))) {
        message.channel.send(greetings.find(x => x.received.includes(message.content)).reply);
    }

    // DATE AND TIME
    if (dateAndTime.some(x => x.received.includes(message.content))) {
        message.channel.send(dateAndTime.find(x => x.received.includes(message.content)).reply);
    }

    // DAD JOKES
    if (jokesAndPuns.some(x => x.received.includes(message.content))) {
        message.channel.send(jokesAndPuns.find(x => x.received.includes(message.content)).reply);
    }

    // GUILD MANAGEMENT
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        
        if (CMD_NAME === 'kick') {

            // KICK MEMBERS
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
                return message.reply('I do not have permissions to use that command :(');
            
            if (args.length === 0) return message.reply('Please provide an ID.');
            
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

            // BAN MEMBER
            if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
                return message.reply('I do not have permissions to use that command :(');
            
            if (args.length === 0) return message.reply('Please provide an ID.');

            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send(`${user} was banned successfully`);
            } catch (err) {
                message.channel.send('An error occured. Either I do not have permissions or the user was not found');
            }
        } else if (CMD_NAME === 'ping') {

            // MESSAGE LATENCY
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Latency of Message = ${timeTaken}ms. 🐉`);
        } else if (CMD_NAME === "help") {

            // SHOWS HELP
            const helpEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Drago's guide")
                .setDescription("My prefix for commands is $")
                .addFields(
                    { name: '$kick id', value: `Kicks user from server` },
                    { name: '$ban id', value: `Bans user from server`},
                    { name: '$joke', value: `Wanna hear a joke? I got tons of them` },
                    { name: '$joke', value: `Wanna hear some puns? I got tons puns` },
                    { name: '$quote', value: `I got tons quotes` },
                    { name: '$ping', value: `Displays ping for message` },
                )
                .setTimestamp();

            message.channel.send({ embeds: [helpEmbed] });
        }
    }
});

bot.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '932304174635442207') {
        switch (name) {
            case '🧙':
                member.roles.add('932275102203146300');
                break;
            case '🏹':
                member.roles.add('932275185036455977');
                break;
            case '⚔':
                member.roles.add('932275701879537725');
                break;
        }
    }
});

bot.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '932304174635442207') {
        switch (name) {
            case '🧙':
                member.roles.remove('932275102203146300');
                break;
            case '🏹':
                member.roles.remove('932275185036455977');
                break;
            case '⚔':
                member.roles.remove('932275701879537725');
                break;
        }
    }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);
