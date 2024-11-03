const { PermissionsBitField } = require('discord.js');

module.exports = async (message, instance) => {
    if (message.author.bot) return;
    if (message.content !== "test") return;

    const channelID = '1301880461471252542'
    const voiceChannel = message.guild.channels.cache.get(channelID)
    const channelName = "test1234"
    const roleName = "InuF-Test"
    let members =[]

    if (!voiceChannel) return console.error(`Voice channel with ID ${channelID} not found`)
        voiceChannel.members.forEach(member => {
            members.push(member)
        })

    try {
        
        const role = await message.guild.roles.create({
            name: roleName,
            color: '#3498db',
            permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages], 
            reason: `Rolle und Kanal für ${message.author.id} erstellt`,
        });

        // Erstellen des Kanals mit Zugriffsberechtigungen
        const channel = await message.guild.channels.create({
            name: channelName,
            type: 0, // Typ 0 = Textkanal
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel], // Verbirgt Kanal für alle
                },
                {
                    id: role.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages], // Nur die Rolle kann den Kanal sehen und schreiben
                },
            ],
        });
        await members[0].roles.add(role.id)

        await message.reply(`Die Rolle **${role.name}** und der Kanal **#${channel.name}** wurden erfolgreich erstellt.`);
    } catch (error) {
        console.error(error);
        await message.reply('Fehler beim Erstellen der Rolle oder des Kanals. Überprüfe die Berechtigungen des Bots.');
    }

}