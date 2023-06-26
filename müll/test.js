const { EmbedBuilder } = require('discord.js');

module.exports = (oldPresence, newPresence) => { 

    function formatUTCDate(dateString) {
        const date = new Date(dateString)
        const options = {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZone: "UTC",
        }
        return date.toLocaleDateString("de-DE", options)
      }
    //if (oldPresence === newPresence) return;
    if (newPresence.member.id === "702427586822930493") {
        const channel = newPresence.client.channels.cache.get("1089643663862272151");
        spotifyacctivity = newPresence.activities.find(activity => activity.name === "Spotify");
        old = oldPresence.activities.find(activity => activity.name === "Spotify");

        if(spotifyacctivity.details === old.details) return;
        const embed = new EmbedBuilder()
            .setTitle("Listening to Song")
            .setDescription(`**${newPresence.member.user.username}**`)
            .addFields(
                {
                    name: "Song",
                    value: spotifyacctivity.details,
                },
                {
                    name: "Album",
                    value: spotifyacctivity.assets.largeText,
                },
                {
                    name: "Artist",
                    value: spotifyacctivity.state,
                },
                {
                    name: "Time",
                    value: formatUTCDate(spotifyacctivity.timestamps.start),
                },

            )
            channel.send({ embeds: [embed] });
            //channel.send('<@738480351046795305>')
    }
}