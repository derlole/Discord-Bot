const { ChannelType } = require("discord.js");

module.exports =  async(message, instance) => {
  if (message.channel.type === 1){
    const server = message.client.guilds.cache.get('1079807641896890488')

    const targetGuild = await message.client.guilds.fetch('1079807641896890488');
    const channelname = message.author.username
   
    targetGuild.channels.create({
      name: channelname,
      type: ChannelType.GuildText,
      parent: 1079807642639290508
    })
    
  }
}