# Skafold [![npm version](https://badge.fury.io/js/skafold.svg)](https://badge.fury.io/js/skafold) [![npm](https://img.shields.io/npm/dt/skafold.svg)]() [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
Skafold is a simple API route scaffolder for Express/Mongoose

## Installation
```
npm install -g skafold
```
or
```
yarn global add skafold
```

## Running Skafold
```
skafold <Model Name> (e.g. skafold Apple)
```

## Output
After running the command, the program will generate a file `routes\apple.js` containing your generated API routes.

## Example output
```javascript
const express = require('express')
const Apple = require('../models/Apple')

const router = express.Router()

// GET - Read all apples
router.get('/apples', (req, res) => {
  Apple.find()
  // Once it has loaded these documents
  .then(apples => {
    // Send them back as the response
    res.json(apples)
  })
  .catch(error => {
    res.status(400).json({ error: error.message })
  })
})

// GET - Read an individual apple document
router.get('/apples/:id', (req, res) => {
  const id = req.params.id
  // Ask the model for the document with this id
  Apple.findById(id)
    // Once it has loaded this document
    .then(apple => {
      // If an apple was found
      if(apple) {
        res.json(apple)
      }
      // If no apple was foound
      else {
        res.status(404).json({ error: `Apple not found with id: ${id}` })
      }
    })
    .catch(error => {
      // If there was an error, most likely with the format of the id
      res.status(400).json({ error: error.message })
    })
})

// POST - Create a new apple document
router.post('/apples', (req, res) => {
  const attributes = req.body
  Apple.create(attributes)
    .then(apple => {
      res.status(201).json(apple)
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// PATCH - Update a apple document
router.patch('/apples/:id', (req, res) => {
  const id = req.params.id
  const attributes = req.body
  Apple.findByIdAndUpdate(id, attributes, { new: true, runValidators: true })
    .then(apple => {
      // If an apple was found and updated
      if(apple) {
        res.status(200).json(apple)
      }
      // If no apple was found
      else {
        res.status(404).json({ error: `Apple not found with id: ${id}` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// DELETE - Destroy a apple document
router.delete('/apples/:id', (req, res) => {
  const id = req.params.id
  Apple.findByIdAndRemove(id)
    .then(apple => {
      // If an apple was found and deleted
      if(apple) {
        res.status(200).json(apple)
      }
      // If no apple was found
      else {
        res.status(404).json({ error: `Apple not found with id: ${id}` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

module.exports = router
```