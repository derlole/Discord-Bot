function getDataMonthly(dataArray, songName) {
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
    dataArray.forEach(song => {
      if (song && song.master_metadata_track_name && songName === song.master_metadata_track_name.replace(/\s+/g, "-")) {
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
  function getDateBy12Months(dataArray, selectedDate) {
    const resultArray = []
    for (let i = 0; i < 12; i++) {
      const startDate = new Date(selectedDate.getTime());
      startDate.setUTCMonth(selectedDate.getMonth() + i);
      const endDate = new Date(startDate.getTime());
      endDate.setUTCMonth(startDate.getMonth() + 1);

      if (startDate.getMonth() === 11) {
        startDate.setUTCFullYear(startDate.getFullYear() + 1);
      }
      const filteredArray = dataArray.filter(song => {
        const songDate = new Date(song.ts);
        return songDate >= startDate && songDate < endDate;
      });
      resultArray.push(filteredArray)
    }
    return resultArray
  }




  args.forEach(track =>{
    const streamBegin = getData(track).streamTimes.sort((a, b) => new Date(a) - new Date(b))[0]
    
    const data = getDateBy12Months(spotify, new Date(streamBegin))
    console.log(data[5])

    const song = getDataMonthly(data[4], track)
    console.log(song)
    const canvas = new ChartJSNodeCanvas({
      width: 1000,
      height: 600,
  },
  )
  const configuration = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Streams',
        data: [data[0].songplayes, data[1].songplayes, data[2].songplayes, data[3].songplayes, data[4].songplayes, data[5].songplayes, data[6].songplayes, data[7].songplayes, data[8].songplayes, data[9].songplayes, data[10].songplayes, data[11].songplayes],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
}

const image =  canvas.renderToBuffer(configuration);
const attachment = new AttachmentBuilder(image)
channel.send({
  files: [attachment],
})
})