module.exports = (message) => {

    if (message.author.id === "738480351046795305" && message.content === "<@1080067670566764544>") {
        message.channel.send("<@702427586822930493>")
    }
    if (message.author.id === "702427586822930493" && message.content === "Test1") {
        console.log(message.author)
    }
}