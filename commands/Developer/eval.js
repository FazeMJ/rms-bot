const Discord = require("discord.js")

module.exports = {
	name: 'eval',
	description: 'Runs the provided Javascript Code',
    cooldown: 1,
    aliases: ['evaluate', 'execute'],
	async execute(message, args, client) {
        if(message.author.id !== '778140362790404158') return message.channel.send('Only the creator can use this command!');
        const code = args.join(" ");
        const response = eval(code);
        if(response !== "" && typeof response !== "undefined") {
        message.channel.send(response);
        }
    },
};