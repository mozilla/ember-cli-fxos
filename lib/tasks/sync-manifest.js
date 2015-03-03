'use strict';

var replace = require('broccoli-replace');
var pickFiles = require('broccoli-static-compiler');
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

  var publicTree = this.pickFiles(this.treeGenerator(this.project.root + '/public'), {
      srcDir: '/',
      files: ['manifest.webapp'],
      destDir: '/'
  });

  publicTree = replace(publicTree.inputTree, {
      files: ['manifest.webapp'],
      patterns: replacements
  });

  return this.mergeTrees([tree, publicTree], { overwrite: true });
}
