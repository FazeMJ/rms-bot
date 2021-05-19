const fs = require('fs');
const Discord = require("discord.js")
module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	guildOnly: false,
	aliases: ['refresh'],
	async execute(message, args) {
		if(message.author.id !== '778140362790404158') return message.channel.send('Only the creator can use this command!');
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

		try {
			delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)]
		} catch (error) {
			message.channel.send(`Error while reloading command! \n**Error:**\n\`${error.message}\``)
		}
		

		try {
			let ReloadedEmbed = new Discord.MessageEmbed()
				.setColor(" #EEFBFB")
				.setDescription(`\`${command.name}\` file was reloaded and is ready!`)
				.setTimestamp();
			
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(ReloadedEmbed);
		} catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};