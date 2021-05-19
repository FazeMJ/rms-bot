const Discord = require(`discord.js`);

module.exports = {
    name: `scam-report`,
    description: `Sends a report`,
    guildOnly: true,
    cooldown: 5,
    aliases: [`post`],
    permission: `SEND_MESSAGES`,
    async execute(message, args, client) {
        const mainChannel = client.channels.cache.get(`834464345832161291`)
        const approvalChannel = client.channels.cache.get(`834470835451985932`)
        const filter = m => m.author.id === message.author.id && !m.guild;
        let user = message.author
        try {
            message.channel.send("**The prompt will continue in your DMs**")
        } catch {
            message.channel.send(`Please open your DMs in order to create a \`Scam Report\`!`)
        }
        //Embeds
        let ScamReport = new Discord.MessageEmbed()
            .setColor(`#EEFBFB`)
            .setTimestamp()
            .setAuthor(user.tag)
            .setTitle(`Scam Report`)

        let ScamInfoEnquire = new Discord.MessageEmbed()
            .setColor(`#EEFBFB`)
            .setTimestamp()
            .setTitle(`Question #1`)
            .setDescription(`**Scam Information**\n \nPlease provide information about the scam. Specify what type of scam it was, explain in detail what happened and any extra information that is important to understand what happened.\n \nSend \`cancel\` to cancel the report`);

        let ScammerInfoEnquire = new Discord.MessageEmbed()
            .setColor(`#EEFBFB`)
            .setTimestamp()
            .setTitle(`Question #2`)
            .setDescription(`**Scammer:** \n \nPlease state who the suspect is. You may state the **ID** of the accused, providing the tag would be convenient too! \nTo copy an ID see: https://www.youtube.com/watch?v=c7q5csO73gM\n \nSend \`cancel\` to cancel the report`);
        let EvidenceInfoEnquire = new Discord.MessageEmbed()
            .setColor(`#EEFBFB`)
            .setTimestamp()
            .setTitle(`Question #3`)
            .setDescription(`**Evidence:** \n \nPlease provide evidence of the scam. This can be anything that proves the scam happened, such as message links to the marketplace, or screenshots of DMs.\n**Important:** Use a service such as ImgBB or Gyazo, as the bot cannot detect attachments!\n \nSend \`cancel\` to cancel the report`);
        let OtherEnquire = new Discord.MessageEmbed()
            .setColor(`#EEFBFB`)
            .setTimestamp()
            .setTitle(`Question #4`)
            .setDescription(`**Other:** \n \nProvide any other information here(Optional)\n \nSend \`cancel\` to cancel the report`)
        //Main FUnctions
        await user.send(`Before you can create a \`Scam Report\`, please answer the below questions`, ScamInfoEnquire).then(async (message) => {
            let collectedInfo = await message.channel.awaitMessages(filter,{max: 1})
            let ScamInfo = collectedInfo.first().content
            if (ScamInfo.toLowerCase() === `cancel`) return user.send(`Scam Report has been cancelled!`)
            ScamReport.addField(`Scam Information:`, ScamInfo)

            await user.send(ScammerInfoEnquire)
            let collectedScammer = await message.channel.awaitMessages(filter,{max: 1})
            let ScammerInfo = collectedScammer.first().content;
            if (ScammerInfo.toLowerCase() === `cancel`) return user.send(`Scam Report has been cancelled!`)
            ScamReport.addField(`Scammer:`, ScammerInfo)

            await user.send(EvidenceInfoEnquire)
            let collectedEvidence = await message.channel.awaitMessages(filter,{max: 1})
            let Evidence = collectedEvidence.first().content;
            if (Evidence.toLowerCase() === `cancel`) return user.send(`Scam Report has been cancelled!`)
            ScamReport.addField(`Evidence:`, Evidence)

            await user.send(OtherEnquire)
            let collectedOther = await message.channel.awaitMessages(filter,{max: 1})
            let Other = collectedOther.first().content;
            if (Other.toLowerCase() === `cancel`) return user.send(`Scam Report has been cancelled!`)
            ScamReport.addField(`Other:`, Other);
            //End of Collection

            await user.send(`Creating Scam Report...`);
            await user.send(`Your \`Scam Report\` has been sent! Kindly wait for the Staff to respond to you. Here is a copy of your report:`, ScamReport);
            await approvalChannel.send(ScamReport).then(async (approvalMessage) => {
                await approvalMessage.react("✅")
                await approvalMessage.react("❌")
                const filterr = (reaction, user) => user.id !== client.user.id;
                const collector = approvalMessage.createReactionCollector(filterr);

                collector.on('collect', r => {
                    if (r.emoji.name == "✅") {
                        mainChannel.send(ScamReport)
                        approvalMessage.delete()
                    }
                    if (r.emoji.name == "❌") {
                        user.send("Your Scam Report was denied!")
                        approvalMessage.delete()
                    }
                });
            });
        })
    }
}