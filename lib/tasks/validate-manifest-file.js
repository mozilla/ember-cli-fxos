'use strict';

var Manifest = require('firefox-app-validator-manifest');
var readFile = require('fs-readfile-promise');
var formatErrorDetails = require('../utils/format-validation-errors');
var chalk = require('chalk');

module.exports = function(manifestPath) {
  var ff = new Manifest();
  return readFile(manifestPath)
    .then(function(buffer) {
      console.log(chalk.blue('Validating /dist/manifest.webapp...'));

      var validation = ff.validate(buffer.toString());
      var errorsCount = Object.keys(validation.errors).length;
      var warningsCount = Object.keys(validation.warnings).length;
      var validationResultMsg = chalk.green('✓ Validation passed');
      var errorDetails = '';

      if (errorsCount > 0) {
        validationResultMsg = chalk.red('Validation Failed');
        errorDetails += formatErrorDetails('Error', validation.errors);
      }

      if (warningsCount > 0) {
        errorDetails += formatErrorDetails('Warning', validation.warnings);
      }

      console.log(validationResultMsg);
      console.log(errorDetails);

    })
    .catch(function(err) {
      if (err.code === 'ENOENT') {
        console.log(chalk.red('Error: no manifest file found at /dist/manifest.webapp\nTry again after running `ember build`'));
      }
      else {
        console.log(chalk.red(err.message));
      }
    });
}
