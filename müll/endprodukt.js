

const { PermissionOverwrites, ChannelType } = require("discord.js");

module.exports =  async(message, instance) => {
  if (message.channel.type === 1){
    const server = message.client.guilds.cache.get('1079807641896890488')

    server.channels.cache.forEach(channel => {
      if(channel.name === message.username) {
        console.log(message.content)
    const dmMessage = message.content;
   

    const targetchannelname = message.guild.channels.cache.find(channel => channel.name === message.username)
    const targetChannelId = targetchannelname.id;
    const targetChannel = await message.client.channels.fetch(targetChannelId);
    
    targetChannel.send(`Nachricht von ${message.author.tag}: ${dmMessage}` )

      }
    }
    
    /*console.log(message.content)
    const dmMessage = message.content;
    const targetChannelId = 'UNDEFINED';
    const targetChannel = await message.client.channels.fetch(targetChannelId);
    
    targetChannel.send(`Nachricht von ${message.author.tag}: ${dmMessage}` )*/
  }
      
  }





    const targetGuildId = '1080867857652527184';
    const targetGuild = await message.client.guilds.fetch(targetGuildId);
    
    