const Discord = require('discord.js');

module.exports = {
    name: `unban`,
    description: `Unbans the user from the guild`,
    guildOnly: true,
    cooldown: 5,
    aliases: [],
	permission: `ADMINISTRATOR`,
    async execute(message, args, client) {
        let toUnban = await client.users.fetch(args[0])
        let reason = args.slice(1).join(" ") || "No reason specified"

        let UnbanNotificationChannel = new Discord.MessageEmbed()
		  .setColor("#EEFBFB")
		  .setTitle("Member Unbanned")
		  .setDescription(`${toUnban} has been unbanned for ${reason}`)
		  .setTimestamp();
	
		message.guild.members.unban(toUnban, reason)
		const Guild = message.channel.guild
		console.log(`${message.author} used the Unban command in the guild: ${Guild}. The user unbanned ${toUnban}`)
	
		message.channel.send(UnbanNotificationChannel)
    }
}