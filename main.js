const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();
//Events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}


//Commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('message', message => {
	if (!message.guild) return
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (!message.member.hasPermission(command.permission)) {
		let MissingPerm = new Discord.MessageEmbed()
        	.setColor("#ff0000")
        	.setTitle("Permissions missing!")
        	.setDescription(`You don't have the permissions to use this command. Only users with the \`${command.permission}\` permission can use the command!`)
            .setTimestamp();

		return message.channel.send(MissingPerm);
	}


	
try {
    command.execute(message, args, client);
    } catch (error) {
	    console.error(error);
	    message.channel.send(`Error occured while executing the command!`);
    }
});
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
//End Of Command Setup

client.login(token);
