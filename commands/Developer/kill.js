const Discord = require("discord.js")

module.exports = {
	name: 'kill',
	description: 'Kills the running node terminal',
    cooldown: 1,
    aliases: ['destroy', 'shutdown'],
	async execute(message) {
		if(message.author.id !== '778140362790404158') return message.channel.send('Only the creator can use this command!');
		await message.channel.send(`SinisterDev has shut down the bot! Kindly wait till its back online.`)
		console.log('SinisterDev has shutdown the bot')
		process.exit();
	},
};