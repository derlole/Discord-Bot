module.exports = async (message, instance) => {
  if (message.channel.id == '1079807642639290510' && message.author.username === "derlole") {
    const user = await message.client.users.fetch('629221531544715264')
      user.send("Seeervus")
    console.log("success")
  }  
}