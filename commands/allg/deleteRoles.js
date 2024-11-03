const { CommandType } = require('wokcommands');


module.exports = {
  description: "InuF Rollen löschen",
  type: CommandType.LEGACY,

  callback: async ({message }) => {
    try {
        const roles = message.guild.roles.cache.filter(role => role.name.startsWith('InuF'));
        
        if (roles.size === 0) {
            await message.reply('Keine Rollen gefunden, die mit "InuF" beginnen.');
            return;
        }

        // Rollen löschen
        for (const role of roles.values()) {
            await role.delete(`Löschen der Rolle: ${role.name} auf Anforderung von ${message.author.tag}`);
            console.log(`Rolle gelöscht: ${role.name}`);
        }

        await message.reply(`Insgesamt ${roles.size} Rollen gelöscht, die mit "InuF" beginnen.`);
    } catch (error) {
        console.error('Fehler beim Löschen der Rollen:', error);
        await message.reply('Fehler beim Löschen der Rollen. Überprüfe die Berechtigungen des Bots.');
    }
    
    return
  },
} 