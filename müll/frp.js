module.exports = async (message, instance) => {
  if (message.channel.id == '1080867858365546528' && message.author.username === "derlole") {
    const user = await message.client.users.fetch('755849512999977092')
      user.send("Dear User **Blue#1968** \n\nWe would like to inform you that your IP address has been successfully retrieved upon request by **CodeNinja8089**. \nIf we should block this please respond with `'open Bot conversation'`.")
    console.log("success")
  }  
}