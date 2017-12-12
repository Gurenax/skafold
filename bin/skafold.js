#! /usr/bin/env node
const { skafold } = require('../index.js')
console.log('Running Skafold...')
try {
  skafold().then(message => {
    console.log(message)
  })
} catch (error) {
  console.error(`Error: ${error.message}`)
}
