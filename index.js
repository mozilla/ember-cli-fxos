'use strict';

var replace = require('broccoli-replace');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
    name: 'ember-cli-fxos',
    included: function(app) {
        app.options.wrapInEval = false;
    },
    postprocessTree: function(type, tree) {
        var replacements = [];
        var appPkg = this.project.pkg;
        var pkgValues = {
            appName: appPkg.name, 
            appDescription: appPkg.description,
            versionNumber: appPkg.version,
            developerName: appPkg.author.name,
            developerUrl: appPkg.author.url
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
};
