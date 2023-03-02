module.exports =  async(message, instance) => {
  if (message.channel.type === 1){
    console.log("Nachricht exportiert")
    console.log(message.content)
    console.log(message.author.username)
    const dmMessage = message.content;
    const targetChannelId = '1080458811103522858';
    const targetChannel = await message.client.channels.fetch(targetChannelId);
    
    targetChannel.send(`Nachricht von ${message.author.tag}: ${dmMessage}` )
  }
      
  }