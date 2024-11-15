module.exports = (instance, client) => {
    async function listChannels(guildId) {
        try {
            // Holt die Guild (Server) anhand der übergebenen ID
            const guild = await client.guilds.fetch(guildId);
            
            // Prüft, ob die Guild gefunden wurde
            if (!guild) {
                console.log("Guild nicht gefunden");
                return;
            }
    
            // Holt alle Channels der Guild und gibt Namen und IDs aus
            guild.channels.cache.forEach(channel => {
                console.log(`Channel Name: ${channel.name}, ID: ${channel.id}, Typ: ${channel.type}`);
            });
        } catch (error) {
            console.error("Fehler beim Abrufen der Channels:", error);
        }
    }
    listChannels("1079388143423340654");
}