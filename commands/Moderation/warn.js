const Discord = require(`discord.js`)

module.exports = {
    name: `warn`,
    description: `Warns a user`,
    guildOnly: true,
    cooldown: 5,
    aliases: [],
	permission: `ADMINISTRATOR`,
    async execute(message, args, client) {
        let toWarn = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        let reason = args.slice(1).join(" ") || "No reason specified"
        let WarnGuild = message.guild
        //Embeds
        let warnHelp = new Discord.MessageEmbed()
            .setColor(`#EEFBFB`)
            .setTitle(`Warn - Moderation`)
            .setDescription(`This command warns the provided member by DMing them`)
            .addFields(
                {
                    name: `Usage`, value: `\`!warn {member} {reason}\``
                }
            )
            .setTimestamp();
        let WarnNotificationDM = new Discord.MessageEmbed()
            .setTitle(`Notification`)
            .setDescription(`You were warned in ${WarnGuild} for the reason: ${reason}`)
            .setTimestamp()
            .setColor(`#EEFBFB`);

        let WarnNotificationChannel= new Discord.MessageEmbed()
            .setTitle(`Member Warned`)
            .setDescription(`${toWarn} has been warned || ${reason}`)
            .setTimestamp()
            .setColor(`#EEFBFB`);
        
        if (!toWarn) return message.channel.send(warnHelp);
        try {
            await toWarn.send(WarnNotificationDM)
            message.channel.send(WarnNotificationChannel)
        } catch {
            await message.channel.send(WarnNotificationChannel)
        }
    }
}