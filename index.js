const { writeCode } = require('./lib/write-code')
const { capitalize } = require('./lib/capitalize')

const skafold = () => {
  const args = [...process.argv]
  const model = args[args.length - 1]
  const modelCapitalized = capitalize(model)
  const modelLowercased = model.toLowerCase()
  const code = `const express = require('express')
const ${modelCapitalized} = require('../models/${modelLowercased}')
const router = express.Router()

// GET - Read all ${modelLowercased}
router.get('/${modelLowercased}s', (req, res) => {
  ${modelCapitalized}.find()
  // Once it has loaded these documents
  .then(${modelLowercased} => {
    // Send them back as the response
    res.json(${modelLowercased})
  })
  .catch(error => {
    res.status(400).json({ error: error.message })
  })
})

// GET - Read an individual ${modelLowercased} document
router.get('/${modelLowercased}s/:id', (req, res) => {
  const id = req.params.id
  // Ask the model for the document with this id
  ${modelCapitalized}.findById(id)
    // Once it has loaded this document
    .then(${modelLowercased} => {
      // If an ${modelLowercased} was found
      if(${modelLowercased}) {
        res.json(${modelLowercased})
      }
      // If no ${modelLowercased} was foound
      else {
        res.status(404).json({ error: \`${
          modelCapitalized
        } not found with id: \${id}\` })
      }
    })
    .catch(error => {
      // If there was an error, most likely with the format of the id
      res.status(400).json({ error: error.message })
    })
})

// POST - Create a new ${modelLowercased} document
router.post('/${modelLowercased}s', (req, res) => {
  const attributes = req.body
  ${modelCapitalized}.create(attributes)
    .then(${modelLowercased} => {
      res.status(201).json(${modelLowercased})
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// PATCH - Update a ${modelLowercased} document
router.patch('/${modelLowercased}s/:id', (req, res) => {
  const id = req.params.id
  const attributes = req.body
  ${
    modelCapitalized
  }.findByIdAndUpdate(id, attributes, { new: true, runValidators: true })
    .then(${modelLowercased} => {
      // If an ${modelLowercased} was found and updated
      if(${modelLowercased}) {
        res.status(200).json(${modelLowercased})
      }
      // If no ${modelLowercased} was found
      else {
        res.status(404).json({ error: \`${
          modelCapitalized
        } not found with id: \${id}\` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// DELETE - Destroy a ${modelLowercased} document
router.delete('/${modelLowercased}s/:id', (req, res) => {
  const id = req.params.id
  ${modelCapitalized}.findByIdAndRemove(id)
    .then(${modelLowercased} => {
      // If an ${modelLowercased} was found and deleted
      if(${modelLowercased}) {
        res.status(200).json(${modelLowercased})
      }
      // If no ${modelLowercased} was found
      else {
        res.status(404).json({ error: \`${
          modelCapitalized
        } not found with id: \${id}\` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

module.exports = router`

  return writeCode(`skafold-${modelLowercased}.js`, code)
    .then(()=> {
      // When the file was completely written
      return `Skafold: API routes for ${modelCapitalized} were created successfully!`
    })
}

module.exports = { skafold }
