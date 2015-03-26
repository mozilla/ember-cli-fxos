'use strict';

var chalk = require('chalk');
var exec     = require('child_process').exec;
var Promise  = require('es6-promise').Promise;

module.exports = function runEmberCommand(command, options) {
  var emberCommand = 'ember ' + command;
  console.log(chalk.blue('Running ember ' + command + '...'));

  return new Promise(function(resolve, reject) {
    exec('ember ' + command, options, function(err, stdout, stderr) {
      if (err) {
        return reject(console.log("Error running ember " + command));
      } else {
        resolve(stdout);
      }
    });
  });
};
