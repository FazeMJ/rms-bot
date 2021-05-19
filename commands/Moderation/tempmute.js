const Discord = require(`discord.js`);
const ms = require('ms');

module.exports = {
    name: 'tempmute',
    description: 'Mute the given member',
    guildOnly: true,
    cooldown: 2,
    aliases: [],
    permission: `ADMINISTRATOR`,
    async execute(message, args, client) {
        let Mutehelp = new Discord.MessageEmbed()
            .setTitle(`Mute - Moderation`)
            .setDescription(`This command mutes a server member from talking`)
            .addFields(
                {
                    name: `Usage:`, value: `\`!mute {user} {reason}\``
                }
            )
            .setTimestamp();

        const toMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        if (toMute) {
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            //Embeds
            let MuteNotificationDM = new Discord.MessageEmbed()
                .setColor("#EEFBFB")
                .setTitle("Notification")
                .setDescription(`You were temporarily muted in **${message.guild}**`)
                .setTimestamp();
            let MuteNotificationChannel = new Discord.MessageEmbed()
                .setColor("#EEFBFB")
                .setTitle("Member Muted")
                .setDescription(`<@${toMute.user.id}> has been muted`)
                .setTimestamp();
            let MuteNotificationChannelErr = new Discord.MessageEmbed()
                .setColor("#EEFBFB")
                .setTitle("Member Muted")
                .setDescription(`<@${toMute.user.id}> has been muted. I wasn't able to DM them!`)
                .setTimestamp();

            if (!args[1]) {
                try {
                    await toMute.roles.add(muteRole.id);
                    message.channel.send(MuteNotificationChannel);
                    toMute.send(MuteNotificationDM)
                    return
                }
                catch {
                    await toMute.roles.add(muteRole.id);
                    message.channel.send(MuteNotificationChannelErr);
                }
            } else {
                try {
                    await toMute.roles.add(muteRole.id);
                    message.channel.send(MuteNotificationChannel);
                    toMute.send(MuteNotificationDM)
                    setTimeout(function () {
                        toMute.roles.remove(muteRole.id);
                    }, ms(args[1]));
                }
                catch {
                    await toMute.roles.add(muteRole.id);
                    message.channel.send(MuteNotificationChannel);
                    setTimeout(function () {
                        toMute.roles.remove(muteRole.id);
                    }, ms(args[1]));
                }
            }
        } else message.channel.send(Mutehelp);
    }
}