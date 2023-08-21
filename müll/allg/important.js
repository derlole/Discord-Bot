module.exports = (messageReaction, user) => {
    if(user.id === "1125486049649504296" && messageReaction.emoji.name === "📌") {
        messageReaction.remove()
        messageReaction.message.react("🫠")
    }
}