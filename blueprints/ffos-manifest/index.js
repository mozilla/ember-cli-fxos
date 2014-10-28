module.exports = {
    name: 'ffos-manifest',
    description: 'Blueprint for creating a manifest.webapp for FFOS apps',
    normalizeEntityName: function() {
        // do nothing here. this prevents ember-cli
        // from yelling at you to have an entity name
    },
    locals: function(options) {
        var project = this.project.pkg;
        return {
          projectName: project.name,
          projectDescription: project.description || '',
          authorName: project.author || '',
          versionNumber: project.version
        }
    }
};
