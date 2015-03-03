'use strict';

var Manifest = require('firefox-app-validator-manifest');
var readFile = require('fs-readfile-promise');
var chalk = require('chalk');

function formatErrorDetails(messageType, msgs) {
  var msg = '';
  for (var result in msgs) {
    msg += chalk.red(messageType + ': ' + result + ' - ' + msgs[result] + '\n');
  }
  return msg;
}

module.exports = {
  name: 'fxos:validate',
  aliases: ['fxos:valid'],
  description: 'Validate the manifest file for a Firefox OS Application',
  works: 'insideProject',

  run: function(options) {
    var ff = new Manifest();

    return readFile(this.project.root + '/dist/manifest.webapp')
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
};
