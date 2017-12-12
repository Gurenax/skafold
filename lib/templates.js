const getTemplateImports = modelCapitalized =>
  `const express = require('express')
const ${modelCapitalized} = require('../models/${modelCapitalized}')
const router = express.Router()

`

const getTemplateReadAll = (
  modelLowercased,
  modelCapitalized,
  modelPluralized
) =>
  `// GET - Read all ${modelPluralized}
router.get('/${modelPluralized}', (req, res) => {
${modelCapitalized}.find()
.then(${modelPluralized} => {
  res.json(${modelPluralized})
})
.catch(error => {
  res.status(400).json({ error: error.message })
})
})

`

const getTemplateReadOne = (
  modelLowercased,
  modelCapitalized,
  modelPluralized
) =>
  `// GET - Read an individual ${modelLowercased} document
router.get('/${modelPluralized}/:id', (req, res) => {
const id = req.params.id
${modelCapitalized}.findById(id)
  .then(${modelLowercased} => {
    if(${modelLowercased}) {
      res.json(${modelLowercased})
    }
    else {
      res.status(404).json({ error: \`${modelCapitalized} not found with id: \${id}\` })
    }
  })
  .catch(error => {
    res.status(400).json({ error: error.message })
  })
})

`

const getTemplatePost = (modelLowercased, modelCapitalized, modelPluralized) =>
  `// POST - Create a new ${modelLowercased} document
router.post('/${modelPluralized}', (req, res) => {
const attributes = req.body
${modelCapitalized}.create(attributes)
  .then(${modelLowercased} => {
    res.status(201).json(${modelLowercased})
  })
  .catch(error => {
    res.status(400).json({ error: error })
  })
})

`

const getTemplatePatch = (modelLowercased, modelCapitalized, modelPluralized) =>
  `// PATCH - Update a ${modelLowercased} document
router.patch('/${modelPluralized}/:id', (req, res) => {
const id = req.params.id
const attributes = req.body
${modelCapitalized}.findByIdAndUpdate(id, attributes, { new: true, runValidators: true })
  .then(${modelLowercased} => {
    if(${modelLowercased}) {
      res.status(200).json(${modelLowercased})
    }
    else {
      res.status(404).json({ error: \`${modelCapitalized} not found with id: \${id}\` })
    }
  })
  .catch(error => {
    res.status(400).json({ error: error })
  })
})

`

const getTemplateDelete = (
  modelLowercased,
  modelCapitalized,
  modelPluralized
) =>
  `// DELETE - Destroy a ${modelLowercased} document
router.delete('/${modelPluralized}/:id', (req, res) => {
const id = req.params.id
${modelCapitalized}.findByIdAndRemove(id)
  .then(${modelLowercased} => {
    if(${modelLowercased}) {
      res.status(200).json(${modelLowercased})
    }
    else {
      res.status(404).json({ error: \`${modelCapitalized} not found with id: \${id}\` })
    }
  })
  .catch(error => {
    res.status(400).json({ error: error })
  })
})

`

const getTemplateExport = () => `module.exports = router`

module.exports = {
  getTemplateImports,
  getTemplateReadAll,
  getTemplateReadOne,
  getTemplatePost,
  getTemplatePatch,
  getTemplateDelete,
  getTemplateExport
}
