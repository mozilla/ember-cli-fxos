'use strict';

var validateManifestFile = require('../tasks/validate-manifest-file');

module.exports = {
  name: 'fxos:validate',
  aliases: ['fxos:valid'],
  description: 'Validate the manifest file for a Firefox OS Application',
  works: 'insideProject',

  run: function(options) {
    var manifestPath = this.project.root + '/dist/manifest.webapp';
    return validateManifestFile(manifestPath);
  }
};
