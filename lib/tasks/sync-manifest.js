'use strict';

var replace = require('broccoli-replace');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
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

  var publicTree = funnel(this.treeGenerator(this.project.root + '/public'), {
      srcDir: '/',
      files: ['manifest.webapp'],
      destDir: '/'
  });

  publicTree = replace(publicTree.inputTree, {
      files: ['manifest.webapp'],
      patterns: replacements
  });

  return mergeTrees([tree, publicTree], { overwrite: true });
}
