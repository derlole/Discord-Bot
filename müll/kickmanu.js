const { CommandType } = require('wokcommands');

module.exports = {
  description: "Kick Manu",
  type: CommandType.LEGACY,

  callback: async ({ client }) => {
    const channelid = "1079388144031506495";
    const manuid = "629221531544715264";

    try {

      // Hole den Sprachkanal basierend auf der ID
      const channel = await client.channels.fetch(channelid);

      if (!channel || channel.type !== 2) { // 2 ist der Typ für Sprachkanäle
        console.error("Der angegebene Kanal ist kein Sprachkanal oder existiert nicht.");
        return { content: "Fehler: Der Kanal ist kein Sprachkanal oder wurde nicht gefunden.", ephemeral: true };
      }

      // Hole das Mitglied basierend auf der ID
      const guild = channel.guild;
      const member = await guild.members.fetch(manuid);

      if (!member) {
        console.error("Das Mitglied mit der angegebenen ID existiert nicht.");
        return { content: "Fehler: Das Mitglied wurde nicht gefunden.", ephemeral: true };
      }

      // Prüfe, ob das Mitglied im Sprachkanal ist
      if (!member.voice.channel || member.voice.channel.id !== channelid) {
        return { content: `${member.user.tag} ist nicht im Sprachkanal.`, ephemeral: true };
      }

      // Entferne das Mitglied aus dem Sprachkanal
      await member.voice.disconnect();
      return { content: `${member.user.tag} wurde erfolgreich aus dem Sprachkanal entfernt.`, ephemeral: true };
    } catch (error) {
      console.error("Fehler beim Entfernen des Mitglieds aus dem Sprachkanal:", error);
      return { content: "Es ist ein Fehler aufgetreten.", ephemeral: true };
    }
  },
};
