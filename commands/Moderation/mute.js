const Discord = require(`discord.js`);

module.exports = {
	name: 'mute',
	description: 'Mute the given member',
    guildOnly: true,
    cooldown: 2,
    aliases: [],
    permission: `ADMINISTRATOR`,
    async execute(message, args, client) {
        let toMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        //Embed
        let Mutehelp = new Discord.MessageEmbed()
            .setTitle(`Mute - Moderation`)
            .setDescription(`This command mutes a server member from talking`)
            .addFields(
                {
                    name: `Usage:`, value: `\`,mute {user} {reason}\``
                }
            )   
            .setTimestamp();
        let mutedRole = message.guild.roles.cache.find(r => r.name === `Muted`);
        let reason = args.slice(1).join(" ") || "No reason specified"
       
        if(!mutedRole) {
            try {
                // Create a role called "Muted"
                mutedRole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                });
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.overwritePermissions(
                    mutedRole,
                    [{ 
                        SEND_MESSAGES: false, 
                        ADD_REACTIONS: false, 
                        CONNECT: false, 
                        SPEAK: false }]
                    )
                });   
            } catch(e) {
                console.log(e.stack);
            }
        }
        if(!toMute){
            return message.channel.send(Mutehelp);
        }
        //Muted Embeds
        let MuteNotificationDM = new Discord.MessageEmbed()
		    .setColor("#EEFBFB")
		    .setTitle("Notification")
		    .setDescription(`You were muted in **${message.guild}** for: ${reason}`)
		    .setTimestamp();
	    let MuteNotificationChannel = new Discord.MessageEmbed()
		    .setColor("#EEFBFB")
		    .setTitle("Member Muted")
		    .setDescription(`${toMute} has been muted for ${reason}`)
		    .setTimestamp();
        let MuteNotificationChannelErr = new Discord.MessageEmbed()
		    .setColor("#EEFBFB")
		    .setTitle("Member Muted")
		    .setDescription(`${toMute} has been muted for ${reason}. I wasn't able to DM them!`)
		    .setTimestamp();
        let AlreadyMuted = new Discord.MessageEmbed()
            .setDescription(`This user is already muted!`)
            .setTitle(`Error!`)
            .setTimestamp()
            .setColor(`#ff0000`);

        if(toMute.id === message.author.id) return message.channel.send("You can not mute yourself!");
            
            try {
                await toMute.roles.add(mutedRole, reason);
                await toMute.send(MuteNotificationDM)
                message.channel.send(MuteNotificationChannel)
            } catch {
                toMute.roles.add(mutedRole, reason);
                message.channel.send(MuteNotificationChannelErr)
            }
    }
}