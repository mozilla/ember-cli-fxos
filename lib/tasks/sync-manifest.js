'use strict';

var replace = require('broccoli-replace');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var parsePkgAuthor = require('../utils/parse-pkg-author');

module.exports = function(appPkg, tree) {
  var replacements = [];
  var pkgDeveloperInfo = parsePkgAuthor(appPkg.author);
  var pkgValues = {
      appName: appPkg.name, 
      appDescription: appPkg.description,
      versionNumber: appPkg.version,
      developerName: pkgDeveloperInfo.name || null,
      developerUrl: pkgDeveloperInfo.url || null
  };

  for (var key in pkgValues) {
    if (pkgValues.hasOwnProperty(key)) {
          var replacement = {
              match: key,
              replacement: pkgValues[key] || ''
          }
          replacements.push(replacement);
    }
  }

  var publicTree = new Funnel(this.project.root + '/public', {
      files: ['manifest.webapp']
  });

  publicTree = replace(publicTree, {
      files: ['manifest.webapp'],
      patterns: replacements
  });

  return new MergeTrees([tree, publicTree], { overwrite: true });
}
