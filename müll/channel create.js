const { PermissionOverwrites, ChannelType } = require("discord.js");

module.exports =  async(message, instance) => {
  if ( message.content === 'mach'){
   const targetGuildId = '1079807641896890488';
    const targetGuild = await message.client.guilds.fetch(targetGuildId);
    
   
    targetGuild.channels.create({
      name: "neuer kanal",
      type: ChannelType.GuildText,
      parent: '1079807642639290508'
    })
    .then((channel) => {
        message.channel.send('Neuer Kanal wurde erstellt!')
      })
  }
}