'use strict';

var MarketplaceClient = require('node-firefox-marketplace');
var chalk = require('chalk');

module.exports = function(mpOptions, manifestUrl) {
  var fxos = new MarketplaceClient(mpOptions);

  return fxos.validateManifest(manifestUrl)
    .then(function(result) { 
      return fxos.publish(result);
    }).then(function(appId) {
      console.log(chalk.green('App succcessfully created. App ID: ', appId));
  });
}
