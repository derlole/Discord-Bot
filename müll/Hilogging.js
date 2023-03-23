const { EmbedBuilder, Client } = require('discord.js');

module.exports =  async (message, client, instance) => {
  if (message.guild.id === "849905679271329803") {
    const logChannel = await message.client.channels.fetch('1086019415927169085');
    const embed = new EmbedBuilder()
    .setTitle("Deleted Message")
    .setColor('#ff00ff')
    .addFields(
        {
            name: "Channel",
            value: message.channel.name,
        },
        { 
            name: "User",
            value: message.author.tag,
        },
        {
            name: "Message",
            value: message.content,
        }
    )
   await logChannel.send({embeds: [embed]});
  }
} 