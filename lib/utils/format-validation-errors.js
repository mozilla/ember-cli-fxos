'use strict';

var chalk = require('chalk');

module.exports = function(messageType, msgs) {
  var msg = '';
  for (var result in msgs) {
    msg += chalk.red(messageType + ': ' + result + ' - ' + msgs[result] + '\n');
  }
  return msg;
}
