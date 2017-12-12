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

## Before Running Skafold
- Ensure that you have already created your model file `( e.g. models\Beer.js )`

## Running Skafold
1. Go to your project's root directory
2. Run the command 
```
skafold <Model Name> (e.g. skafold Beer)
```

## Output
After running the command, the program will generate a file `routes\beer.js` containing your generated API routes.

## Example output
```javascript
const express = require('express')
const Beer = require('../models/Beer')
const router = express.Router()

// GET - Read all beers
router.get('/beers', (req, res) => {
  Beer.find()
  .then(beers => {
    res.json(beers)
  })
  .catch(error => {
    res.status(400).json({ error: error.message })
  })
})

// GET - Read an individual beer document
router.get('/beers/:id', (req, res) => {
  const id = req.params.id
  Beer.findById(id)
  .then(beer => {
    if(beer) {
      res.json(beer)
    }
    else {
      res.status(404).json({ error: `Beer not found with id: ${id}` })
    }
  })
  .catch(error => {
    res.status(400).json({ error: error.message })
  })
})

// POST - Create a new beer document
router.post('/beers', (req, res) => {
  const attributes = req.body
  Beer.create(attributes)
  .then(beer => {
    res.status(201).json(beer)
  })
  .catch(error => {
    res.status(400).json({ error: error })
  })
})

// PATCH - Update a beer document
router.patch('/beers/:id', (req, res) => {
  const id = req.params.id
  const attributes = req.body
  Beer.findByIdAndUpdate(id, attributes, { new: true, runValidators: true })
  .then(beer => {
    if(beer) {
      res.status(200).json(beer)
    }
    else {
      res.status(404).json({ error: `Beer not found with id: ${id}` })
    }
  })
  .catch(error => {
    res.status(400).json({ error: error })
  })
})

// DELETE - Destroy a beer document
router.delete('/beers/:id', (req, res) => {
  const id = req.params.id
  Beer.findByIdAndRemove(id)
  .then(beer => {
    if(beer) {
      res.status(200).json(beer)
    }
    else {
      res.status(404).json({ error: `Beer not found with id: ${id}` })
    }
  })
  .catch(error => {
    res.status(400).json({ error: error })
  })
})

module.exports = router
```