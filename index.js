const capitalize = require('lodash/capitalize')
const _inflection = require('lodash-inflection')
const { writeToFile, checkFileExists } = require('./lib/files')
const mkdirp = require('mkdirp')
const {
  getTemplateImports,
  getTemplateReadAll,
  getTemplateReadOne,
  getTemplatePost,
  getTemplatePatch,
  getTemplateDelete,
  getTemplateExport
} = require('./lib/templates')

const skafold = () => {
  // Handle argument check
  if (process.argv.length <= 2)
    throw new Error('Please specify the name of the Model')

  // Get function arguments
  const args = [...process.argv]
  const model = args[args.length - 1]

  // Model Name Templates
  const modelLowercased = model.toLowerCase()
  const modelCapitalized = capitalize(model)
  const modelPluralized = _inflection.pluralize(modelLowercased)

  // Handle model file check
  try {
    checkFileExists(`models/${modelCapitalized}.js`)
  } catch (err) {
    throw new Error(
      `Please ensure that the Model file models/${modelCapitalized}.js has already been created`
    )
  }

  const routesFolder = 'routes'
  const routesFile = `${routesFolder}/${modelLowercased}.js`
  const template =
    getTemplateImports(modelCapitalized) +
    getTemplateReadAll(modelLowercased, modelCapitalized, modelPluralized) +
    getTemplateReadOne(modelLowercased, modelCapitalized, modelPluralized) +
    getTemplatePost(modelLowercased, modelCapitalized, modelPluralized) +
    getTemplatePatch(modelLowercased, modelCapitalized, modelPluralized) +
    getTemplateDelete(modelLowercased, modelCapitalized, modelPluralized) +
    getTemplateExport()

  mkdirp(routesFolder, err => {
    if (err) {
      console.error(err)
      return
    }
  })

  return writeToFile(routesFile, template).then(() => {
    // When the file was completely written
    return `Skafold: API routes for ${modelCapitalized} were created successfully!`
  })
}

module.exports = { skafold }
