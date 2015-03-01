'use strict';

var MarketplaceClient = require('node-firefox-marketplace');
var chalk = require('chalk');

module.exports = {
  name: 'fxos:publish',
  description: 'Publish Firefox OS App to Marketplace',
  works: 'insideProject',
  availableOptions:  [
    { name: 'url', type: String },
    { name: 'environment', type: String, default: 'development' }
  ],

  run: function(options) {
    var mpOptions = require(this.project.root + '/config/fxos.js')[options.environment];
    var manifestUrl = mpOptions.publishedManifestUrl || options.url;
    var fxos = new MarketplaceClient(mpOptions);

    return fxos.validateManifest(manifestUrl)
      .then(function(result) { 
        return fxos.publish(result);
      }).then(function(appId) {
        console.log(chalk.green('App succcessfully created. App ID: ', appId));
      });
  }
};
