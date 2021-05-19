const Discord = require('discord.js');

module.exports = {
    name: `ban`,
    description: `Ban a member from the guild`,
    guildOnly: true,
    cooldown: 5,
    aliases: [],
	permission: `ADMINISTRATOR`,
    async execute(message, args) {
    let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
  
	  let reason = args.slice(1).join(" ") || "No reason specified"
	  let BanNotificationDM = new Discord.MessageEmbed()
		.setColor("#EEFBFB")
		.setTitle("Notification")
		.setDescription(`You were banned in **${message.guild}** for: ${reason}`)
		.setTimestamp();
	  let BanNotificationChannel = new Discord.MessageEmbed()
		.setColor("#EEFBFB")
		.setTitle("Member Banned")
		.setDescription(`${toBan} has been banned for ${reason}`)
		.setTimestamp();
	  //End of definitions
	  try {
		await toBan.send(BanNotificationDM)
		toBan.ban({
		  reason: reason
		})
	  } catch {
		toBan.ban({
		  reason: reason
		})
  
	  }
	  const Guild = message.channel.guild
	  console.log(`${message.author} used the Ban command in the guild: ${Guild}. The user Banned ${toBan}`)
	  message.channel.send(BanNotificationChannel)
    }
}