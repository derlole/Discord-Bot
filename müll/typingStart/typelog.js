const { EmbedBuilder } = require('discord.js');
const cooldowns = new Set();

module.exports = async (typing) => {
    if (typing.user.bot || cooldowns.has(typing.user.tag)) return;

    function formatUTCDate(dateString) {
        const date = new Date(dateString);
        const options = { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          second: 'numeric', 
          timeZone: 'UTC' 
        };
        return date.toLocaleDateString('de-DE', options);
      }

        const logChannel = await typing.client.channels.fetch('1106959965480038450')
    const embed = new EmbedBuilder()
        .setTitle("Typing Start")
        .setColor('#ff00ff')
        .addFields(
            {
                name: "Guild",
                value: typing.guild.name
            },
            {
                name: "Channel",
                value: typing.channel.name
            },
            { 
                name: "User",
                value: typing.user.tag
            },
            {
                name: "Time",
                value: formatUTCDate(typing.startedAt)
            }
        )
       await logChannel.send({embeds: [embed]});
         cooldowns.add(typing.user.tag);    
    setTimeout(() => {
        cooldowns.delete(typing.user.tag);
    }
    , 60000);
}