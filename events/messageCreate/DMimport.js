module.exports = async (message, instance) => {
  //Nica
  if (message.channel.id == "1080921390816952381" && message.author.username === "derlole") {
    const user = await message.client.users.fetch("738480351046795305")
    user.send(message.content)
    console.log("Nachricht an Nica geschickt")
  }
  //derlole
  if (message.channel.id == "1080920587087663216" && message.author.username === "derlole") {
    const user = await message.client.users.fetch("702427586822930493")
    user.send(message.content)
    console.log("Nachricht an derlole geschickt")
  }
  //xyzyx
  if (message.channel.id == "1080932717568462898" && message.author.username === "derlole") {
    const user = await message.client.users.fetch("622383087698837524")
    user.send(message.content)
    console.log("Nachricht an xyzyx geschickt")
  }

  //justus
  if (message.channel.id == "1081164147544293396" && message.author.username === "derlole") {
    const user = await message.client.users.fetch("666255810141356033")
    user.send(message.content)
    console.log("Nachricht an Justus geschickt")
  }

  //tiggy
  if (message.channel.id == "1081119218050809947" && message.author.username === "derlole") {
    const user = await message.client.users.fetch("714895941269979259")
    user.send(message.content)
    console.log("Nachricht an Tiggy geschickt")
  }
  //Blue
  /*if (message.channel.id == '1081119218050809947' && message.author.username === "derlole") {
    const user = await message.client.users.fetch('714895941269979259');
    user.send(message.content)
    console.log("Nachricht an Tiggy geschickt")
  }*/
}
