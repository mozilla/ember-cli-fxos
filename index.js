'use strict';

var replace = require('broccoli-replace');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var parseAuthor = require('parse-author');
var commands = require('./lib/commands');

module.exports = {
    name: 'ember-cli-fxos',
    included: function(app) {
        app.options.wrapInEval = false;
    },
    includedCommands: function() {
        return commands;
    },
    parsePkgAuthor: function(authorData) {
        var developerInfo = {};
        if (typeof authorData === 'string') {
            developerInfo = parseAuthor(authorData);
        } else if (typeof authorData === 'object') {
            developerInfo = authorData;
        }
        return developerInfo;
    },
    postprocessTree: function(type, tree) {
        var replacements = [];
        var appPkg = this.project.pkg;
        var pkgDeveloperInfo = this.parsePkgAuthor(appPkg.author);
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
};
