const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require("discord.js")
const getSpotifyData = require("../../Spotifydatenverhau/getSpotifyData")

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
      type: 6,
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
      //required: true,
    },
  ],
  category: "spotify stats",
  slash: true,
  callback: async ({ client, interaction, args, channel, guild }) => {
    if (interaction.options.getString("dinge") === "songinfo" &! interaction.options.getString("song")) return interaction.reply({ content: "Please give me a song to compare", ephemeral: true })
    if (interaction.options.getString("dinge") === "artistinfo" &! interaction.options.getString("song")) return interaction.reply({ content: "Please give me a song to compare", ephemeral: true })
    //Importing the data
    const user = interaction.options.getUser("user").id
    const user1 = interaction.user.id

    var spotify0 = getSpotifyData(user)
    var spotify1 = getSpotifyData(user1)
    const getData = (songName0) => {
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
    const getData1 = (songName1) => {
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
  const getAll = () => {
    let data = {
      songplayes: 0,
      skipped: 0,
      notSkipped: 0,
      notListened: 0,
      playtime: 0,
      playtime: 0,
      shuffle: 0,
      offline: 0,
      streamTimes: [],
    }
    spotify0.forEach(song => {
      if (song && song.master_metadata_track_name) {
        data.songplayes++
        song.skipped ? data.skipped++ : data.notSkipped++
        if (song.ms_played === 0) data.notListened++
        if (song.ms_played > 0) data.playtime = data.playtime + song.ms_played
        if (song.offline) data.offline++
        if (song.shuffle) data.shuffle++
        //console.log(song.master_metadata_track_name)
        data.streamTimes.push(song.ts)
      }
    })
    return data
  }
  const getAll1 = () => {
    let data = {
      songplayes: 0,
      skipped: 0,
      notSkipped: 0,
      notListened: 0,
      playtime: 0,
      playtime: 0,
      shuffle: 0,
      offline: 0,
      streamTimes: [],
    }
    spotify1.forEach(song => {
      if (song && song.master_metadata_track_name) {
        data.songplayes++
        song.skipped ? data.skipped++ : data.notSkipped++
        if (song.ms_played === 0) data.notListened++
        if (song.ms_played > 0) data.playtime = data.playtime + song.ms_played
        if (song.offline) data.offline++
        if (song.shuffle) data.shuffle++
        //console.log(song.master_metadata_track_name)
        data.streamTimes.push(song.ts)
      }
    })
    return data
  }
    const dinge = interaction.options.getString("dinge")
    switch (dinge) {
      case "songinfo":
        const songname = interaction.options.getString("song").replace(/\s+/g, "-")
        console.log(songname)
        var data = getData(songname)
        var data1 = getData1(songname)
        var SI = true
        break
      case "artistinfo":
        const artistname = interaction.options.getString("song").replace(/\s+/g, "-")
        var data = getArtistInfo(artistname)
        var data1 = getArtistInfo1(artistname)
        var ATI = true
        break
      case "overall":
        var data = getAll()
        var data1 = getAll1()
        var OI = true
        break
    }
    

    //until here
    const dude = interaction.options.getUser("user").username
    const dude1 = interaction.user.username

    if(ATI) {
        const artistembed = new EmbedBuilder()
        .setTitle(`Artist: ${args[2]}`)
        .setColor("000000")
        .setFields(
            { name: "User", value: `${dude} / ${dude1}` },
            { name: "Songs Listened", value: `${data.songsListened} / ${data1.songsListened}` },
            { name: "Skipped", value: `${data.artistSkipped} / ${data1.artistSkipped}` },
            { name: "Playtime", value: `${formatHours(data.artistPlaytime, { long: true })} / ${formatHours(data1.artistPlaytime, { long: true })}` },
            { name: "Shuffle", value: `${data.artistShuffle} / ${data1.artistShuffle}` },
        )
        channel.send({ embeds: [artistembed] })
    }
    else if (SI) {
    const sortedFirststream = data.streamTimes.sort((a, b) => new Date(a) - new Date(b))
    const sortedFirststream1 = data1.streamTimes.sort((a, b) => new Date(a) - new Date(b))
    const embed = new EmbedBuilder()
      .setTitle(`Song: ${args[2]} by ${data.artist}`)
      .setColor("000000")
      .setFields(
        { name: "User", value: `${dude} / ${dude1} / diff / %diff` },
        { name: "Songplays", value: `${data.songplayes} / ${data1.songplayes} / ${Math.abs(data.songplayes - data1.songplayes)} /Percentual Difference: das hier is nur testtext` },
        { name: "Playtime", value: `${formatHours(data.playtime)} / ${formatHours(data1.playtime)}` },
        { name: "Average time Played", value: `${formatMinutes(data.playtime / data.songplayes)} / ${formatMinutes(data1.playtime / data1.songplayes)}` },
        { name: "Skipped", value: `**${data.skipped}** (${(data.skipped / data.songplayes * 100).toFixed(2)}%) / **${data1.skipped}** (${(data1.skipped / data1.songplayes * 100).toFixed(2)}%) / **${Math.abs(data.skipped - data1.skipped)}**  (${(Math.abs((data.skipped / data.songplayes * 100).toFixed(2) - (data1.skipped / data1.songplayes * 100).toFixed(2))).toFixed(2)})% / (${(Math.abs((data.skipped / data.songplayes * 100).toFixed(2) / (data1.skipped / data1.songplayes * 100).toFixed(2))).toFixed(2)})%` },
        { name: "Shuffle", value: `**${data.shuffle}** (${(data.shuffle / data.songplayes * 100).toFixed(2)}%) / **${data1.shuffle}** (${(data1.shuffle / data1.songplayes * 100).toFixed(2)}%) / **${Math.abs(data.shuffle - data1.shuffle)}**  (${(Math.abs((data.shuffle / data.songplayes * 100).toFixed(2) - (data1.shuffle / data1.songplayes * 100).toFixed(2))).toFixed(2)})% / (${(Math.abs((data.shuffle / data.songplayes * 100).toFixed(2) / (data1.shuffle / data1.songplayes * 100).toFixed(2))).toFixed(2)})%` },
        { name: "Offline", value: `**${data.offline}** (${(data.offline / data.songplayes * 100).toFixed(2)}%) / **${data1.offline}** (${(data1.offline / data1.songplayes * 100).toFixed(2)}%) / **${Math.abs(data.offline - data1.offline)}**  (${(Math.abs((data.offline / data.songplayes * 100).toFixed(2) - (data1.offline / data1.songplayes * 100).toFixed(2))).toFixed(2)})% / (${(Math.abs((data.offline / data.songplayes * 100).toFixed(2) / (data1.offline / data1.songplayes * 100).toFixed(2))).toFixed(2)})%` },
        { name: "Artist", value: `${data.artist} ` },
        { name: "First Stream", value: `${formatUTCDate(sortedFirststream[0])} / ${formatUTCDate(sortedFirststream1[0])}` }
      )
    channel.send({ embeds: [embed] })
      }
    else if(OI) {
    const sortedFirststream = data.streamTimes.sort((a, b) => new Date(a) - new Date(b))
    const sortedFirststream1 = data1.streamTimes.sort((a, b) => new Date(a) - new Date(b))
    const embedoverall = new EmbedBuilder()
      .setTitle(`Overall`)
      .setColor("000000")
      .setFields(
        { name: "User", value: `${dude} / ${dude1}` },
        { name: "Songplayes", value: `${data.songplayes} / ${data1.songplayes} / ${Math.abs(data.songplayes - data1.songplayes)}` },
        { name: "Playtime", value: `${formatHours(data.playtime)} / ${formatHours(data1.playtime)} / ${formatHours(Math.abs(data.playtime - data1.playtime))}` },
        { name: "Not Listened", value: `${data.notListened} / ${data1.notListened} / ${Math.abs(data.notListened - data1.notListened)}` },
        { name: "Skipped", value: `**${data.skipped}** (${(data.skipped / data.songplayes * 100).toFixed(2)}%) / **${data1.skipped}** (${(data1.skipped / data1.songplayes * 100).toFixed(2)}%) / **${Math.abs(data.skipped - data1.skipped)}**  (${Math.abs((data.skipped / data.songplayes * 100).toFixed(2) - (data1.skipped / data1.songplayes * 100).toFixed(2))})% / (${(Math.abs((data.skipped / data.songplayes * 100).toFixed(2) / (data1.skipped / data1.songplayes * 100).toFixed(2))).toFixed(2)})% ` },
        { name: "Shuffle", value: `**${data.shuffle}** (${(data.shuffle / data.songplayes * 100).toFixed(2)}%) / **${data1.shuffle}** (${(data1.shuffle / data1.songplayes * 100).toFixed(2)}%) / **${Math.abs(data.shuffle - data1.shuffle)}**  (${Math.abs((data.shuffle / data.songplayes * 100).toFixed(2) - (data1.shuffle / data1.songplayes * 100).toFixed(2))})% / (${(Math.abs((data.shuffle / data.songplayes * 100).toFixed(2) / (data1.shuffle / data1.songplayes * 100).toFixed(2))).toFixed(2)})%` },
        { name: "Offline", value: `**${data.offline}** (${(data.offline / data.songplayes * 100).toFixed(2)}%) / **${data1.offline}** (${(data1.offline / data1.songplayes * 100).toFixed(2)}%) / **${Math.abs(data.offline - data1.offline)}**  (${(Math.abs((data.offline / data.songplayes * 100).toFixed(2) - (data1.offline / data1.songplayes * 100).toFixed(2))).toFixed(2)})% / (${(Math.abs((data.offline / data.songplayes * 100).toFixed(2) / (data1.offline / data1.songplayes * 100).toFixed(2))).toFixed(2)})%` },
        { name: "First Stream", value: `${formatUTCDate(sortedFirststream[0])} / ${formatUTCDate(sortedFirststream1[0])}` }
      )
    channel.send({ embeds: [embedoverall] })
    }
  },
}