module.exports = (message, instance) => {
    if (message.content === "test" && message.channel.id === "1079807642639290510") {
        message.react("👍")
    }
}