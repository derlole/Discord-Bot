module.exports = (messageReaction, user) => {
    const test = user.id.role;
    const guildMember = messageReaction.message.guild.members.cache.get(user.id);
            const role = messageReaction.message.guild.roles.cache.get('1089514700598943849');
        if (messageReaction.message.guild.id === '1089153627643449436') {
            if(messageReaction.emoji.name === '👍' && messageReaction.message.channel.id ==='1089513842670841857') {
                guildMember.roles.add(role)
        }
    }
}
