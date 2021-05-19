const Discord = require("discord.js")

module.exports = {
	name: 'purge',
	description: 'Purges the given number of messages',
    guildOnly: true,
    cooldown: 10,
    aliases: ['clear'],
    permission: `ADMINISTRATOR`,
	async execute(message, args) {
		let PurgeHelp = new Discord.MessageEmbed()
        .setColor("#EEFBFB")
        .setTitle("Purge - Moderation")
        .setDescription("This command deletes messages from the channel in context. \n \n`!purge {limit}` - Limit refers to the number of messages you want to clear \n \n**Aliases:** `Clear`")
        .setTimestamp();

    if (message.deletable) {
        await message.delete();
    }


    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.channel.send(PurgeHelp).then(m => m.delete(5000));
    }

    let deleteAmount;
    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
    .catch(err => message.reply(`Something went wrong... ${err}`));
	},
};