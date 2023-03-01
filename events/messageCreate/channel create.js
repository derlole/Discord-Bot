const { PermissionOverwrites } = require("discord.js");

module.exports =  async(message, instance) => {
  if (/*message.channel.type === 1 &&*/ message.content === 'mach'){
   const targetGuildId = '1079807641896890488';
    const targetGuild = await message.client.guilds.fetch(targetGuildId);
    const channelName = 'testchannel';
   
    targetGuild.channels.create(channelName)
    


      
    /*.then((channel) => {
        message.channel.send(Neuer Kanal ${channel} wurde erstellt!);
      })*/
  }
}