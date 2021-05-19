const Discord = require('discord.js');

module.exports = {
    name: `kick`,
    description: `Kicks a member from the guild`,
    guildOnly: true,
    cooldown: 5,
    aliases: [],
	permission: `ADMINISTRATOR`,
    async execute(message, args, client) {
      //Function
      let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
  
	  let reason = args.slice(1).join(" ") || "No reason specified"
	  let KickNotificationDM = new Discord.MessageEmbed()
		.setColor("#EEFBFB")
		.setTitle("Notification")
		.setDescription(`You were kicked in **${message.guild}** for: ${reason}`)
		.setTimestamp();
	  let KickNotificationChannel = new Discord.MessageEmbed()
		.setColor("#EEFBFB")
		.setTitle("Member Kicked")
		.setDescription(`${toBan} has been kicked for ${reason}`)
		.setTimestamp();
	  //End of definitions
	  try {
		await toBan.send(KickNotificationDM)
		toBan.kick({
		  reason: reason
		})
	  } catch {
		toBan.kick({
		  reason: reason
		})
	  }
	  message.channel.send(KickNotificationChannel)
	  const Guild = message.channel.guild
	  console.log(`${message.author} used the Kick command in the guild: ${Guild}. The user kicked ${toBan}`)
    }
}