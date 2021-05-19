const Discord = require("discord.js")

module.exports = {
	name: 'ping',
	description: 'Ping!',
	guildOnly: false,
	cooldown: 5,
	aliases: [],
	permission: `SEND_MESSAGES`,
	async execute(message, args) {
		message.channel.send('Calculating Ping...').then(resultMessage =>{
			const ping = resultMessage.createdTimestamp - message.createdTimestamp
			const newEmbed = new Discord.MessageEmbed()
			.setColor('#EEFBFB')
			.setDescription(`**Bot Latency: ${ping}ms**`)
	
	
		message.channel.send(newEmbed)
		const Guild = message.channel.guild
		console.log(`${message.author} used the Ping command in the guild: ${Guild}. The latency at the time was ${ping}ms`)
		
		})
	},
};