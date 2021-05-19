const Discord = require(`discord.js`);

module.exports = {
    name: `poll`,
    description: `Sends a post`,
    guildOnly: true,
    cooldown: 5,
    aliases: [],
	permission: `SEND_MESSAGES`,
    async execute(message, args) {
    }
}