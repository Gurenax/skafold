const FS = require('fs')
const Util = require('util')
const writeFilePromise = Util.promisify(FS.writeFile)
// const checkFileExistsPromise = Util.promisify(FS.access)


const writeToFile = (filePath, code) => {
  const date = new Date()
  const timestamp = date.toISOString()
  return writeFilePromise(filePath, code)
}

const checkFileExists = (filePath) => {
  // return checkFileExistsPromise(filePath)
    // .then(res => {
    //   // console.log(res)
    //   return res
    // })
    // .catch(err => {
    //   // console.error(err)
    //   return err
    // })
  // let res
  // return checkFileExistsPromise(f)
const result = FS.statSync(filePath)
// console.log(result)
return result
  // return FS.exists(filePath)
  // console.log(res)
}


// FS.access(filePath, FS.constants.F_OK, err => {
//   return err ? 'no access!' : 'can read/write'
// })

module.exports = { writeToFile, checkFileExists }