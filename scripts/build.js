'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production'

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true})

var chalk = require('chalk')
var fs = require('fs-extra')
var webpack = require('webpack')
var config = require('../webpack.config')({production: true})
var paths = require('../conf/paths')
var checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
var FileSizeReporter = require('react-dev-utils/FileSizeReporter')
var measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
var printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appBuild).then(previousFileSizes => {
  fs.emptyDirSync(paths.appBuild)
  build(previousFileSizes)
  copyPublicFolder()
})

// Print out errors
function printErrors (summary, errors) {
  console.log(chalk.red(summary))
  console.log()
  errors.forEach(err => {
    console.log(err.message || err)
    console.log()
  })
}

// Create the production build and print the deployment instructions.
function build (previousFileSizes) {
  webpack(config).run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err])
      process.exit(1)
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors)
      process.exit(1)
    }

    if (process.env.CI && stats.compilation.warnings.length) {
      printErrors('Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.', stats.compilation.warnings)
      process.exit(1)
    }

    console.log(chalk.green('Compiled successfully.'))
    console.log()

    console.log('File sizes after gzip:')
    console.log()
    printFileSizesAfterBuild(stats, previousFileSizes)
    console.log()
  })
}

function copyPublicFolder () {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  })
}