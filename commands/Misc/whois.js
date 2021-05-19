const Discord = require("discord.js")

module.exports = {
	name: 'whois',
	description: 'Displays information about a user',
    guildOnly: true,
    cooldown: 3,
    aliases: ['userinfo', 'memberinfo'],
    permission: `ADMINISTRATOR`,
	  async execute(message, args) {
		const { guild, channel } = message

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)
    let av = user.displayAvatarURL({ dynamic: true});

    console.log(member)

    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.tag}`)
      .setColor('#EEFBFB')
      .setDescription(`<@${user.id}>`)
      .setThumbnail(av)
      .setTimestamp()
      .setFooter(`User ID: ${user.id}`)
      .addFields(
        {
          name: 'Guild Join Date:',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
          inline: true
        },
        {
          name: 'Account creation date:',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
          inline: true
        },
        {
          name: 'Nickname',
          value: member.nickname || 'None',
          inline: true
        },
        {
          name: 'Roles',
          value: message.member.roles.cache.map(role => role.toString()).join(", "),
          inline: true
        }
        
      )


    channel.send(embed)
  }
};