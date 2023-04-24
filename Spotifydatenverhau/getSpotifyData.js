const fs = require('fs')
const path = require('path')

module.exports = (directory) => {
  let data = []

  const files = fs.readdirSync(path.join(__dirname, directory), { withFileTypes: true })

  for (const file of files) {
    const filePath = path.join(path.join(__dirname, directory), file.name)
    const dataArray = require(filePath)
    dataArray.forEach((dataObject) => {
        data.push(dataObject)
    })
  }

  return data
}   