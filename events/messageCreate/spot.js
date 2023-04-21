module.exports = (message, instance) => {
    if (message.channel.id === '1079807642639290510'){
    const user = message.author.id
    spotifyEins = require(`../../Spotifydatenverhau/songdata0-${user}.json`)
    spotifyZwei = require(`../../Spotifydatenverhau/songdata1-${user}.json`)
    spotifyDrei = require(`../../Spotifydatenverhau/songdata2-${user}.json`)
    spotifyVier = require(`../../Spotifydatenverhau/songdata3-${user}.json`)
    console.log(user)
    console.log(spotifyEins)

    }
}
  