module.exports = async (message) => {
    if (message.author.id === '702427586822930493' && message.channel.id === '1142931525990633603') {
    const user = await message.client.users.fetch("738480351046795305")
    user.send(message.content)
    console.log("Nachricht geschickt")
    }
}
