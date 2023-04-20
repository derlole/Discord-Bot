const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require("discord.js")

function formatMinutes(milliseconds) {
  if (!milliseconds) return "no wert bruder"
  let seconds = Math.floor(milliseconds / 1000) % 60
  let minutes = Math.floor(milliseconds / 60000)
  return `${minutes.toString()}:${seconds.toString().padStart(2, "0")} min`
}
function formatHours(milliseconds) {
  if (!milliseconds) return "no wert bruder"
  let seconds = Math.floor(milliseconds / 1000) % 60
  let minutes = Math.floor(milliseconds / 60000) % 60
  let hours = Math.floor(milliseconds / 3600000)
  return `${hours.toString().padStart(2, "0")} h ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} min`
}

function formatUTCDate(dateString) {
  const date = new Date(dateString)
  console.log(date)
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
module.exports = {
  description: "Compare your Spotify Stats with Nica's",
  type: CommandType.SLASH,
  options: [
    {
      name: "user",
      description: "Your requestet user to compare with",
      type: 3,
      required: true,
    },
    {
      name: "dinge", //index
      description: "give your requested index",
      type: 3,
      required: true,
      choices: [
        {
          name: "songinfo",
          value: "songinfo",
        },
        {
          name: "artistinfo",
          value: "artistinfo",
        },
        {
          name: "overall",
          value: "overall",
        },
      ],
    },
    {
      name: "song",
      description: "give your requested song",
      type: 3,
      required: true,
    },
  ],
  category: "spotify stats",
  slash: true,
  callback: async ({ client, message, interaction, args, text, channel, guild, version }) => {
    //Importing the data
    const spotifyEins = require("../../nicasongs0.json")
    const spotifyZwei = require("../../nicasongs1.json")
    const spotifyDrei = require("../../nicasongs2.json")
    const spotifyVier = require("../../nicasongs3.json")
    var spotify0 = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier)
    const spotifyEins1 = require("../../songdata0.json")
    const spotifyZwei1 = require("../../songdata1.json")
    const spotifyDrei1 = require("../../songdata2.json")
    const spotifyVier1 = require("../../songdata3.json")
    var spotify1 = spotifyEins1.concat(spotifyZwei1, spotifyDrei1, spotifyVier1)
    
    const user = interaction.options.getString("user")
    const dinge = interaction.options.getString("dinge")

    const getSongInfo = (songName0) => {
      let data = {
        songplayes: 0,
        skipped: 0,
        notSkipped: 0,
        notListened: 0,
        playtime: 0,
        playtime: 0,
        shuffle: 0,
        offline: 0,
        artist: "",
        streamTimes: [],
      }
      spotify0.forEach((song) => {
        if (song && song.master_metadata_track_name && songName0 === song.master_metadata_track_name.replace(/\s+/g, "-")) {
          data.songplayes++
          song.skipped ? data.skipped++ : data.notSkipped++
          if (song.ms_played === 0) data.notListened++
          if (song.ms_played > 0) data.playtime = data.playtime + song.ms_played
          if (song.offline) data.offline++
          if (song.shuffle) data.shuffle++
          data.artist = song.master_metadata_album_artist_name
          data.streamTimes.push(song.ts)
        }
      })
      return data
    }
    const getSongInfo1 = (songName1) => {
      let data1 = {
        songplayes: 0,
        skipped: 0,
        notSkipped: 0,
        notListened: 0,
        playtime: 0,
        playtime: 0,
        shuffle: 0,
        offline: 0,
        artist: "",
        streamTimes: [],
      }
      spotify1.forEach((song) => {
        if (song && song.master_metadata_track_name && songName1 === song.master_metadata_track_name.replace(/\s+/g, "-")) {
          data1.songplayes++
          song.skipped ? data1.skipped++ : data1.notSkipped++
          if (song.ms_played === 0) data1.notListened++
          if (song.ms_played > 0) data1.playtime = data1.playtime + song.ms_played
          if (song.offline) data1.offline++
          if (song.shuffle) data1.shuffle++
          data1.artist = song.master_metadata_album_artist_name
          data1.streamTimes.push(song.ts)
        }
      })
      return data1
    }
    const getArtistInfo = (artistName) => {
      let artistData = {
          songsListened: 0,
          artistSkipped: 0,
          artistPlaytime: 0,
          artistShuffle: 0,
      }
      spotify0.forEach(song => {
          if (song && song.master_metadata_album_artist_name && artistName === song.master_metadata_album_artist_name.replace(/\s+/g, "-")) {
              artistData.songsListened++
              if (song.skipped) artistData.artistSkipped++
              if (song.ms_played > 0) artistData.artistPlaytime = artistData.artistPlaytime + song.ms_played
              if (song.shuffle) artistData.artistShuffle++
          }
      })
      return artistData
    }
      const getArtistInfo1 = (artistName) => {
        let artistData = {
            songsListened: 0,
            artistSkipped: 0,
            artistPlaytime: 0,
            artistShuffle: 0,
        }
        spotify1.forEach(song => {
            if (song && song.master_metadata_album_artist_name && artistName === song.master_metadata_album_artist_name.replace(/\s+/g, "-")) {
                artistData.songsListened++
                if (song.skipped) artistData.artistSkipped++
                if (song.ms_played > 0) artistData.artistPlaytime = artistData.artistPlaytime + song.ms_played
                if (song.shuffle) artistData.artistShuffle++
            }
        })
        return artistData
      }

    switch (dinge) {
      case "songinfo":
        const songname = interaction.options.getString("song").replace(/\s+/g, "-")
        console.log(songname)
        var data = getSongInfo(songname)
        var data1 = getSongInfo1(songname)
        break
      case "artistinfo":
        const artistname = interaction.options.getString("song").replace(/\s+/g, "-")
        var data = getArtistInfo(artistname)
        var data1 = getArtistInfo1(artistname)
        var ATI = true
        break
      case "overall":
        var data = getSongInfo()
        var data1 = getSongInfo1()
        break
    }


    const sortedFirststream = data.streamTimes.sort((a, b) => new Date(a) - new Date(b))
    const sortedFirststream1 = data1.streamTimes.sort((a, b) => new Date(a) - new Date(b))
    const embed = new EmbedBuilder()
      .setTitle(`Song: ${args[1]} by ${data.artist}`)
      .setColor("000000")
      .setFields(
        { name: "User", value: `Nica / derlole` },
        { name: "Songplayes", value: `${data.songplayes} / ${data1.songplayes}` },
        { name: "Skipped", value: `${data.skipped} / ${data1.skipped}` },
        { name: "Not Skipped", value: `${data.notSkipped} / ${data1.notSkipped}` },
        { name: "Not Listened", value: `${data.notListened} / ${data1.notListened}` },
        { name: "Playtime", value: `${formatMinutes(data.playtime)} / ${formatMinutes(data1.playtime)}` },
        { name: "Shuffle", value: `${data.shuffle} / ${data1.shuffle}` },
        { name: "Offline", value: `${data.offline} / ${data1.offline}` },
        { name: "Artist", value: `${data.artist} ` },
        { name: "First Stream", value: `${formatUTCDate(sortedFirststream[0])} / ${formatUTCDate(sortedFirststream1[0])}` }
      )
    channel.send({ embeds: [embed] })
  },
}
