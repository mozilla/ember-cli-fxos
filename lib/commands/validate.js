'use strict';

var runEmberCommand = require('../utils/run-ember-command');
var validateManifestFile = require('../tasks/validate-manifest-file');

module.exports = {
  name: 'fxos:validate',
  aliases: ['fxos:valid'],
  description: 'Validate the manifest file for a Firefox OS Application',
  works: 'insideProject',

  run: function(options) {
    var projectRoot = this.project.root;
    var manifestPath = projectRoot + '/dist/manifest.webapp';
    var emberBuild = runEmberCommand('build', { cwd: projectRoot });
    
    return emberBuild.then(validateManifestFile(manifestPath));
  }
};
