#! /usr/bin/env node
const { skafold } = require('../index.js')
console.log('Running Skafold...')
skafold().then( message => {
    console.log(message)
  })