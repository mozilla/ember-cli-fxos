'use strict';

var publishToMarketplace = require('../tasks/publish-to-marketplace');

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
    return publishToMarketplace(mpOptions, manifestUrl);
  }
};
