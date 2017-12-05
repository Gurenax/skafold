#! /usr/bin/env node
// let shell = require('shelljs')
const { skafold } = require('../index.js')
console.log('Running Skafold...')
// shell.exec('skafold')
skafold().then( message => {
    console.log(message)
  })