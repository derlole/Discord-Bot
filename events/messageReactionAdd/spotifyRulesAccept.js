module.exports = (messageReaction, guild) => {
    console-log("dasmussdasein")
    if (guild.id === '1089153627643449436') {
        console.log("lol")
        if(messageReaction.emoji.name === '👍') {
            console.log('lel')
        const role = message.guild.roles.cache.find(role => role.name === 'Spotify-User');
        message.member.roles.add(role);
    }}
}