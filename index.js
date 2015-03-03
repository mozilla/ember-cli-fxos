'use strict';

var commands = require('./lib/commands');
var syncManifest = require('./lib/tasks/sync-manifest');

module.exports = {
    name: 'ember-cli-fxos',
    included: function(app) {
        app.options.wrapInEval = false;
    },
    includedCommands: function() {
        return commands;
    },
    postprocessTree: function(type, tree) {
        var appPkg = this.project.pkg;
        return syncManifest.apply(this, [appPkg, tree]);
    }
};
