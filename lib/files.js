const FS = require('fs')
const Util = require('util')
const writeFilePromise = Util.promisify(FS.writeFile)

const writeToFile = (filePath, code) => {
  const date = new Date()
  const timestamp = date.toISOString()
  return writeFilePromise(filePath, code)
}

const checkFileExists = (filePath) => {
  const result = FS.statSync(filePath)
  return result
}

module.exports = { writeToFile, checkFileExists }