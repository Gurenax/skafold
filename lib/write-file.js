const FS = require('fs')
const Util = require('util')
const writeFilePromise = Util.promisify(FS.writeFile)

const writeToFile = (filePath, code) => {
  const date = new Date()
  const timestamp = date.toISOString()
  return writeFilePromise(filePath, code)
}

module.exports = { writeToFile }